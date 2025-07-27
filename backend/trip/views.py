from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import math
from django.db.models import Count
from utils.qr import generate_qr_url
from .models import Trip
from .serializers import *
from reservation.models import Reservation

def haversine(lat1, lon1, lat2, lon2):
    """
    Calcula la distancia en metros entre dos puntos
    usando la fórmula de Haversine.
    """
    R = 6_371_000  # radio de la Tierra en metros
    φ1, φ2 = math.radians(lat1), math.radians(lat2)
    Δφ = math.radians(lat2 - lat1)
    Δλ = math.radians(lon2 - lon1)
    a = math.sin(Δφ/2)**2 + math.cos(φ1) * math.cos(φ2) * math.sin(Δλ/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class TripViewSet(viewsets.ModelViewSet):
    # CRUD for Trip model using PostGIS PointFields and FK to Vehicle
    queryset = Trip.objects.select_related('vehicle').all()
    serializer_class = TripSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def most_used_trips(self, request):
        trips = (Trip.objects
                 .annotate(total_trips = Count('reservations'))
                 .exclude(total_trips = 0)
                 .order_by('-total_trips')[:10]
            )
        
        serializer = MostUsedTripsSerializer(trips, many=True)
        return Response(serializer.data)


    @action(detail=True, methods=['post'], url_path='generate-qr')
    def generate_qr(self, request, pk=None):
        trip = self.get_object()
        qr_url = generate_qr_url(trip.id)
        trip.qr_url = qr_url
        trip.save()
        return Response({'qr_url': trip.qr_url})

    @action(detail=True, methods=['post'], url_path='scan-qr')
    def scan_qr(self, request, pk=None):
        trip = self.get_object()
        user = request.user
        token = request.data.get('token')

        reservation = trip.reservations.filter(user=user).first()
        if not reservation:
            return Response({'error': 'No tienes una reserva para este viaje.'}, status=status.HTTP_403_FORBIDDEN)

        # Se marca como "abordado" el trip.
        reservation.has_boarded = True; 
        reservation.save()

        return Response({'message': 'Viaje validado exitosamente.'})
    
    
    @action(detail=False, methods=['get'], url_path='nearby-trips')
    def nearby_trips(self, request):
        """
        GET /api/trips/nearby-trips/?lon=<float>&lat=<float>&radius=<int opcional>
        Devuelve todos los trips que tengan paradas a ≤ radius metros de (lon, lat)
        y para cada uno incluye la distancia a la parada MÁS CERCANA.
        """
        lon = request.query_params.get('lon')
        lat = request.query_params.get('lat')
        try:
            lon, lat = float(lon), float(lat)
        except (TypeError, ValueError):
            return Response(
                {"detail": "Parámetros 'lon' y 'lat' requeridos y válidos."},
                status=status.HTTP_400_BAD_REQUEST
            )
        radius = float(request.query_params.get('radius', 500))

        # 1) Filtrar trips que tengan start, end o alguna parada a ≤ radius
        trips_qs = Trip.get_nearby(lon, lat, radius)

        results = []
        for trip in trips_qs:
            # 2) Obtener sólo las paradas de ese trip dentro del radio
            stops = trip.nearby_stops(lon, lat, radius)
            if not stops:
                continue

            # 3) Calcular distancias de cada parada y quedarnos con la mínima
            distancias = [
                haversine(lat, lon, lat_p, lon_p) 
                for lon_p, lat_p in stops
            ]
            idx = distancias.index(min(distancias))
            nearest = stops[idx]
            min_dist = distancias[idx]

            # 4) Armar el dict de salida
            results.append({
                "trip_id": trip.id,
                "vehicle_plate": trip.vehicle.plate,
                "nearest_stop_distance_m": min_dist,
                "nearest_stop": {
                    "longitude": nearest[0],
                    "latitude":  nearest[1]
                }
            })

        return Response(results)
    
    @action(detail=False, methods=['get'], url_path='my-scheduled', permission_classes=[IsAuthenticated])
    def my_scheduled_trips(self, request):
        """
        Retorna los viajes programados por el conductor autenticado.
        """
        user = request.user
        trips = Trip.objects.filter(vehicle__driver__user=user, status='scheduled').order_by('-start_time')

        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='start', permission_classes=[IsAuthenticated])
    def start_trip(self, request, pk=None):
        trip = self.get_object()
        user = request.user

        if trip.vehicle.driver.user != user:
            return Response({"detail": "No autorizado para iniciar este viaje."}, status=403)

        if trip.status != 'scheduled':
            return Response({"detail": "Este viaje ya fue iniciado o finalizado."}, status=400)

        trip.status = 'in_progress'
        trip.save()
        return Response({"detail": "Viaje iniciado exitosamente."})
    
    @action(detail=False, methods=['get'], url_path='current', permission_classes=[IsAuthenticated])
    def current_trip(self, request):
        """
        Devuelve el viaje en progreso del conductor actual, si existe.
        """
        user = request.user
        trip = Trip.objects.filter(vehicle__driver__user=user, status='in_progress').first()
        if not trip:
            return Response({'detail': 'No tienes ningún viaje en progreso'}, status=404)

        serializer = TripSerializer(trip)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='finish', permission_classes=[IsAuthenticated])
    def finish_trip(self, request):
        """
        Finaliza el viaje en progreso del conductor actual, si existe.
        """
        user = request.user
        trip = Trip.objects.filter(vehicle__driver__user=user, status='in_progress').first()
        if not trip:
            return Response({'detail': 'No tienes ningún viaje en progreso'}, status=404)

        trip.status = 'finished'
        trip.save()
        return Response({'detail': 'Viaje finalizado correctamente.'})
    
