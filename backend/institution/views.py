from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Institution
from .serializers import InstitutionSerializer

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [AllowAny]
