import requests
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers
from django.contrib.gis.geos import MultiLineString, LineString, Point
from .models import Trip

class TripSerializer(GeoFeatureModelSerializer):
    waypoints = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
            min_length=2,
            max_length=2
        ),
        write_only=True,
        required=False,
        help_text="Lista opcional de puntos intermedios [[lon, lat], [lon, lat], ...]"
    )

    class Meta:
        model = Trip
        geo_field = 'route'
        fields = (
            'id', 'vehicle', 'start_point', 'end_point', 'qr_url',
            'route', 'duration', 'distance', 'status', 'waypoints'
        )
        read_only_fields = ('route', 'duration', 'distance')

    def create(self, validated_data):
        waypoints = validated_data.pop('waypoints', [])

        # Convierte diccionarios GeoJSON en objetos Point
        start_point_geojson = validated_data.pop('start_point')
        end_point_geojson = validated_data.pop('end_point')

        start_point = Point(start_point_geojson['coordinates'], srid=4326)
        end_point = Point(end_point_geojson['coordinates'], srid=4326)

        validated_data['start_point'] = start_point
        validated_data['end_point'] = end_point

        # Preparar coordenadas para OSRM
        coords_list = [
            f"{start_point.x},{start_point.y}"
        ]

        coords_list += [f"{lon},{lat}" for lon, lat in waypoints]

        coords_list.append(f"{end_point.x},{end_point.y}")

        coords_str = ";".join(coords_list)

        # Solicitud a OSRM
        osrm_url = (
            f"http://router.project-osrm.org/route/v1/driving/{coords_str}"
            "?overview=full&geometries=geojson"
        )

        response = requests.get(osrm_url).json()

        if response['code'] != 'Ok':
            raise serializers.ValidationError('No se pudo obtener la ruta desde OSRM.')

        coords = response['routes'][0]['geometry']['coordinates']
        duration = response['routes'][0]['duration'] / 60  # minutos
        distance = response['routes'][0]['distance'] / 1000  # km

        validated_data['route'] = MultiLineString([LineString(coords)], srid=4326)
        validated_data['duration'] = duration
        validated_data['distance'] = distance

        trip = Trip.objects.create(**validated_data)
        return trip

class MostUsedTripsSerializer(serializers.ModelSerializer):
    total_trips = serializers.IntegerField()

    class Meta:
        model = Trip
        fields = ['id', 'total_trips']