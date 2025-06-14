from django.db import models
from django.conf import settings


class Admin_User(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='admin_profile',
    )

    def __str__(self):
        return f"{self.user.dni} - {self.user.names}{self.user.lastnames}"