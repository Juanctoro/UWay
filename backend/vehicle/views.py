from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.permissions import AllowAny
from django.db.models import Count
from statistics import mean
from trip.models import Trip
from .models import Vehicle
from .serializers import *
from driver.models import Driver


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.select_related('driver').all()
    serializer_class = VehicleSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def mine(self, request):
        try:
            # Buscar el Driver asociado al usuario autenticado
            driver = Driver.objects.get(user=request.user)
        except Driver.DoesNotExist:
            return Response({'detail': 'No estás registrado como conductor.'}, status=403)

        # Obtener vehículos asociados a ese driver
        vehicles = Vehicle.objects.filter(driver=driver)
        serializer = self.get_serializer(vehicles, many=True)
        return Response(serializer.data)

    # Viajes hechos por un vehiculo específico
    @action(detail=True, methods=['get'])
    def vehicle_trips(self, request, pk=None):
        vehicle = self.get_object()
        total = Trip.objects.filter(vehicle=vehicle).count()

        return Response({
            'vehicle_plate': vehicle.plate,
            'total_trips': total
        })

    # Viajes hechos por cada vehiculo
    @action(detail=False, methods=['get'])
    def total_trips(self, request, pk=None):
        vehicles = Vehicle.objects.annotate(
            total_trips = Count('trips')
        ).order_by('-total_trips')

        serializer = VehicleTotalTripsSerializer(vehicles, many=True)
        return Response(serializer.data)

        