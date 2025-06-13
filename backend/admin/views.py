from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Admin
from .serializers import AdminSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.select_related('user').all()
    serializer_class = AdminSerializer
    lookup_field = 'user'
    permission_classes = [AllowAny]