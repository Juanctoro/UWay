from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action, api_view
from django.contrib.gis.geos import Point, GEOSGeometry
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count, F, Avg
from statistics import mean
from review.models import Review
from trip.models import Trip
from .models import Driver
from .serializers import *

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.select_related('user').all()
    serializer_class = DriverSerializer
    lookup_field = 'user'  # lookup by User DNI
    permission_classes = [AllowAny]    

    # Viajes hechos por un conductor específico
    @action(detail=True, methods=['get'])
    def driver_trips(self, request, user=None):
        driver = self.get_object()
        total = Trip.objects.filter(vehicle__driver=driver).count()

        return Response({
            'driver_dni': driver.user_id,
            'total_trips': total
            })
    
    # Viajes hechos por cada conductor
    @action(detail=False, methods=['get'])
    def total_trips(self, request):
        drivers = (Driver.objects
            .annotate(total_trips = Count('vehicles__trips'))
            .order_by('-total_trips'))

        serializer = DriverTotalTripsSerializer(drivers, many=True)
        return Response(serializer.data)
    
    # Calificaciones y comentarios de cada conductor
    @action(detail=False, methods=['get'])
    def rating_reviews(self, request):
        reviews = Review.objects.select_related(
            'reservation__trip__vehicle__driver__user',
            'reservation__user'
        ).order_by('-reservation__trip__vehicle__driver__user__dni')

        serializer = DriverReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    # Obtener promedio de rating de todos los conductores
    @action(detail=False, methods=['get'])
    def average_ratings(self, request):
        ratings = (
            Review.objects
            .filter(reservation__trip__vehicle__driver__user__isnull=False)
            .values(driver_id=F('reservation__trip__vehicle__driver__user__dni'))
            .annotate(average_rating=Avg('rating'))
            .order_by('-average_rating')
        )

        for r in ratings:
            r['average_rating'] = round(r['average_rating'], 2)
        
        serializer = DriverAverageRatingsSerializer(ratings, many=True)
        return Response(ratings)
    
class DriverFilesViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.select_related('user').all()
    serializer_class = DriverFilesSerializer
    parser_classes = [MultiPartParser, FormParser]  # Necesario para subir archivos PDF
    lookup_field = 'user'  # lookup by User DNI
    permission_classes = [AllowAny]   

@api_view(['POST'])
def update_location(request, driver_id):
    serializer = LocationUpdateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    lat = serializer.validated_data['lat']
    lon = serializer.validated_data['lon']

    try:
        driver = Driver.objects.get(pk=driver_id)
    except Driver.DoesNotExist:
        return Response({'detail': 'Driver not found'}, status=status.HTTP_404_NOT_FOUND)

    point = Point(lon, lat, srid=4326)
    driver.current_location = point
    driver.save()

    # Encontrar viaje activo
    trip = Trip.objects.filter(vehicle__driver=driver, status=Trip.STATUS_IN_PROGRESS).first()
    if not trip or not trip.route:
        return Response({'detail': 'No active trip or route assigned'}, status=status.HTTP_200_OK)

    # Convertir geometrías a GEOS para comparar
    driver_geom = GEOSGeometry(point.wkt, srid=4326)
    route_geom = GEOSGeometry(trip.route.wkt, srid=4326)

    # 50 metros ≈ 0.00045 grados
    max_deviation = 50 / 111139

    if driver_geom.distance(route_geom) > max_deviation:
        trip.deviation_detected = True
        trip.save()
        return Response({'detail': 'Deviation detected'}, status=status.HTTP_200_OK)

    return Response({'detail': 'Location updated successfully'}, status=status.HTTP_200_OK)