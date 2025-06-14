from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Vehicle
from .serializers import VehicleSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    """
    CRUD for Vehicle model linked to Driver via FK
    """
    queryset = Vehicle.objects.select_related('driver').all()
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny]