from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'trip'
    permission_classes = [AllowAny]
