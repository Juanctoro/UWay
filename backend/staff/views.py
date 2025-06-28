from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from staff.models import Staff
from staff.serializers import StaffSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.select_related('user').all()
    serializer_class = StaffSerializer
    lookup_field = 'user'
    permission_classes = [AllowAny]
