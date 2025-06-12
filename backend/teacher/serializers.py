from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Teacher

User = get_user_model()

class TeacherSerializer(serializers.ModelSerializer):
    # Para crear/editar se envía `user` con el DNI existente
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Teacher
        fields = ['user', 'faculty', 'position', 'is_active']