from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Admin_User

User = get_user_model()

class AdminUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Admin_User
        fields = ['user']