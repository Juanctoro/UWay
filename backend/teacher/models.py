from django.db import models
from django.conf import settings

def upload_to_teacher(instance, filename):
    return f"UWay/files/teacher_files/{instance.user.dni}/teacher_card_{instance.user.dni}.pdf"


class Teacher(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='teacher_profile'
    )
    teacher_code = models.CharField(verbose_name='Código', max_length=100, null=True, unique=True)
    faculty   = models.CharField('Facultad', max_length=255)
    position  = models.CharField('Cargo', max_length=255)
    is_active = models.BooleanField('Activo', default=False)

    teacher_card = models.FileField('Carné de Docente', upload_to=upload_to_teacher, null=True, blank=True)

    def __str__(self):
        return f"{self.user.dni} – {self.user.names} {self.user.lastnames}"
