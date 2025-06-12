from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Teacher
from .serializers import TeacherSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    """
    CRUD para profesores enlazados a User por DNI.
    """
    queryset = Teacher.objects.select_related('user').all()
    serializer_class = TeacherSerializer
    lookup_field = 'user'  # usa el DNI del User en la URL
    permission_classes = [AllowAny]