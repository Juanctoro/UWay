from django.db import models
from UWay import settings

def upload_to_student(instance, filename):
    return f"UWay/files/student_files/{instance.user.dni}/student_card_{instance.user.dni}.pdf"

class Student(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='student_profile',
    )
    code = models.CharField(verbose_name='Código', max_length=100)
    semester = models.CharField(verbose_name='Semestre', max_length=100)
    is_active = models.BooleanField(verbose_name='Activo', default=False, max_length=100)
    
    student_card = models.FileField(verbose_name='Carné de Estudiante', upload_to=upload_to_student, null=True, blank=True)

    def __str__(self):
        return f"{self.user.dni} - {self.user.names} {self.user.lastnames}"
