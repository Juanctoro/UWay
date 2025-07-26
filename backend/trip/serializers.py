import requests
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from django.contrib.gis.geos import MultiLineString, LineString, Point
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    waypoints = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
            min_length=2,
            max_length=2
        ),
        write_only=True,
        required=False
    )

    class Meta:
        model = Trip
        fields = (
            'id', 'vehicle', 'qr_url',
            'route', 'duration', 'distance', 'status', 'waypoints', 'start_time'
        )
        read_only_fields = ('route', 'duration', 'distance')

    def create(self, validated_data):
        waypoints = validated_data.pop('waypoints', [])

        # Preparar coordenadas para OSRM: asume waypoints incluye inicio y fin
        const_coords = [f"{lon},{lat}" for lon, lat in waypoints]
        coords_str = ";".join(const_coords)

        osrm_url = (
            f"http://router.project-osrm.org/route/v1/driving/{coords_str}"
            "?overview=full&geometries=geojson"
        )
        resp = requests.get(osrm_url).json()
        if resp.get('code') != 'Ok':
            raise serializers.ValidationError('No se pudo obtener la ruta desde OSRM.')

        route_coords = resp['routes'][0]['geometry']['coordinates']
        duration = resp['routes'][0]['duration'] / 60  # minutos
        distance = resp['routes'][0]['distance'] / 1000  # km

        validated_data['route'] = MultiLineString([LineString(route_coords)], srid=4326)
        validated_data['duration'] = duration
        validated_data['distance'] = distance

        return Trip.objects.create(**validated_data)

class MostUsedTripsSerializer(serializers.ModelSerializer):
    total_trips = serializers.IntegerField()

    class Meta:
        model = Trip
        fields = ['id', 'total_trips']