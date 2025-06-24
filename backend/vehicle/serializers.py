from rest_framework import serializers
from .models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'id', 'driver', 'tecnomecanica', 'model',
            'brand', 'soat', 'status', 'color',
            'plate', 'category'
        ]

class VehicleTotalTripsSerializer(serializers.ModelSerializer):
    total_trips = serializers.IntegerField()

    class Meta:
        model = Vehicle
        fields = ['id','plate', 'total_trips']