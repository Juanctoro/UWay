from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from student.models import Student
from teacher.serializers import TeacherSerializer


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.select_related('user').all()
    serializer_class = TeacherSerializer
    lookup_field = 'user'
    permission_classes = [AllowAny]