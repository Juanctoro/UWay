from django.db import models
from django.conf import settings

class Teacher(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='teacher_profile'
    )
    faculty   = models.CharField('Facultad', max_length=255)
    position  = models.CharField('Cargo', max_length=255)
    is_active = models.BooleanField('Activo', default=True)

    def __str__(self):
        return f"{self.user.dni} – {self.user.names} {self.user.lastnames}"