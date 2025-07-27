from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Driver
from review.models import Review

User = get_user_model()

class DriverSerializer(serializers.ModelSerializer):
    # use user DNI as PK
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Driver
        fields = ['user', 'license_number', 'papers', 'is_approved', 'soat_file', 'driver_license_file', 'transit_license_file']

class DriverReviewSerializer(serializers.ModelSerializer):
    driver_id = serializers.CharField(source='reservation.trip.vehicle.driver.user.dni')
    user_id = serializers.CharField(source='reservation.user.dni')
    review_id = serializers.IntegerField(source='id')
    review_rating = serializers.IntegerField(source='rating')
    review_comment = serializers.CharField(source='comment')

    class Meta:
        model = Review
        fields = [
            'driver_id',
            'review_id',
            'user_id',
            'review_rating',
            'review_comment'
        ]

class DriverTotalTripsSerializer(serializers.ModelSerializer):
    total_trips = serializers.IntegerField()
    dni = serializers.CharField(source='user.dni')
    names = serializers.CharField(source='user.names')

    class Meta:
        model = Driver
        fields = ['dni', 'names', 'total_trips']

class DriverAverageRatingsSerializer(serializers.ModelSerializer):
    driver_id = serializers.CharField()
    average_rating = serializers.FloatField()

    class Meta:
        model = Driver
        fields = ['driver_id', 'average_rating']


class LocationUpdateSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    lon = serializers.FloatField()