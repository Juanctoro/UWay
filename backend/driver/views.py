from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Driver
from .serializers import DriverSerializer

class DriverViewSet(viewsets.ModelViewSet):
    """
    CRUD for Driver model linked by User DNI as primary key
    """
    queryset = Driver.objects.select_related('user').all()
    serializer_class = DriverSerializer
    lookup_field = 'user'  # lookup by User DNI
    permission_classes = [AllowAny]