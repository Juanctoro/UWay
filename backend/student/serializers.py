from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Student

User = get_user_model()

class StudentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Student
        fields = ['user', 'semester', 'code', 'is_active']