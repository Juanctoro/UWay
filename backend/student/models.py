from django.db import models

from UWay import settings


# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='student_profile',
    )
    semester = models.CharField(verbose_name='Semestre', max_length=100)
    code = models.CharField(verbose_name='Código', max_length=100)
    is_active = models.CharField(verbose_name='Activo', default=True, max_length=100)

    def __str__(self):
        return f"{self.user.dni} - {self.user.names} {self.user.lastnames}"
