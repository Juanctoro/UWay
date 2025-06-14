from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'