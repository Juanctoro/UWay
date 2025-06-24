from rest_framework import viewsets
from rest_framework.decorators import action
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