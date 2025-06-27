from django.db import models
from django.conf import settings

class Driver(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='drivers'
    )
    license_number = models.CharField('License Number', max_length=50)
    papers         = models.URLField('Papers URL', max_length=200)
    is_approved    = models.BooleanField('Approved', default=False)

    def __str__(self):
        return f"{self.user.dni} - {self.user.names} - {self.license_number}"
        