from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Admin_User
from .serializers import AdminUserSerializer

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = Admin_User.objects.select_related('user').all()
    serializer_class = AdminUserSerializer
    lookup_field = 'user'
    permission_classes = [AllowAny]