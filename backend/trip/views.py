from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from utils.qr import generate_qr_url
from .models import Trip
from .serializers import *
from reservation.models import Reservation

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

        # Se marcar como "abordado" o registrar un timestamp
        # Por ejemplo: reservation.boarded = True; reservation.save()

        return Response({'message': 'Viaje validado exitosamente.'})