from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Driver

User = get_user_model()

class DriverSerializer(serializers.ModelSerializer):
    # use user DNI as PK
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Driver
        fields = ['user', 'license_number', 'papers', 'is_approved']