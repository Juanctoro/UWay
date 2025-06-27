from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['id', 'vehicle', 'start_point', 'end_point', 'qr_url', 'status']

class MostUsedTripsSerializer(serializers.ModelSerializer):
    total_trips = serializers.IntegerField()

    class Meta:
        model = Trip
        fields = ['id', 'total_trips']