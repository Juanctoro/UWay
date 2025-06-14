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
