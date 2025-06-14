from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Trip
from .serializers import TripSerializer

class TripViewSet(viewsets.ModelViewSet):
    """
    CRUD for Trip model using PostGIS PointFields and FK to Vehicle
    """
    queryset = Trip.objects.select_related('vehicle').all()
    serializer_class = TripSerializer
    permission_classes = [AllowAny]