from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Staff

User = get_user_model()

class StaffSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Staff
        fields = ['user', 'area', 'staff_code', 'location']