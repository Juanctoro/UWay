from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count, Func, CharField
from django.db.models.functions import TruncTime
from .models import Reservation
from .serializers import *
from django.utils.timezone import now
from datetime import date

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny]

    # Horas más concurridas
    @action(detail=False, methods=['get'])
    def most_requested_hours(self, request):
        reservations = (Reservation.objects
            .filter(reserved_at__isnull=False)
            .annotate(time=TruncHourMinute('reserved_at'))
            .values('time')
            .annotate(total=Count('id'))
            .order_by('-total')[:10]
            )
        
        return Response(reservations)
    
    
    @action(detail=False, methods=['post'], url_path='create-from-map')
    def create_from_map(self, request):
        """
        Crea una reserva usando el punto seleccionado en el mapa.
        Espera:
        {
            "trip_id": int,
            "selected_point": { "lat": float, "lng": float }
        }
        """
        user = request.user
        trip_id = request.data.get("trip_id")
        selected = request.data.get("selected_point")

        if not trip_id or not selected:
            return Response({'error': 'trip_id y selected_point son requeridos.'}, status=400)

        try:
            trip = Trip.objects.get(id=trip_id)
        except Trip.DoesNotExist:
            return Response({'error': 'El viaje no existe.'}, status=404)

        try:
            pickup_point = Point(float(selected['lng']), float(selected['lat']), srid=4326)
        except Exception:
            return Response({'error': 'selected_point inválido.'}, status=400)

        # Preparar los datos para el serializer
        serializer = ReservationSerializer(data={
            'user': user.pk,
            'trip': trip.id,
            'pickup_point': pickup_point.wkt,
            'reserved_at': now()
        })

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Reserva creada con éxito.', 'reservation': serializer.data})
        return Response(serializer.errors, status=400)
        
    @action(detail=False, methods=['get'], url_path='my-reservations', permission_classes=[IsAuthenticated])
    def my_reservations(self, request):
        """
        Retorna las reservas del usuario autenticado que son para hoy o fechas futuras.
        """
        user = request.user
        today = date.today()

        # Filter reservations where the associated trip's start_date is today or in the future
        reservations = Reservation.objects.filter(
            user=user,
            reserved_at__gte=today
        )
        
        serializer = self.get_serializer(reservations, many=True)
        return Response(serializer.data)
    
# Esta clase personalizada permite extraer unicamente horas y minutos del TIMESTAMP
class TruncHourMinute(Func):
    function = 'TO_CHAR'
    template = "%(function)s(%(expressions)s, 'HH24:MI')"
    output_field = CharField()
