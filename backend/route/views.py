from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Route
from .serializers import RouteSerializer

class RouteViewSet(viewsets.ModelViewSet):
    """
    CRUD for Route model with generic ID, duration, distance, and stops
    """
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [AllowAny]
