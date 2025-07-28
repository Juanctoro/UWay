from django.db import models
from UWay import settings


# Create your models here.
class Staff(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='staff',
    )
    staff_code = models.CharField(verbose_name='Código', max_length=100)
    area = models.CharField(verbose_name='Área', max_length=100)
    contract_type = models.CharField(verbose_name='Tipo de contrato', max_length=100)
    location = models.CharField(verbose_name='Sede', max_length=100)

    def __str__(self):
        return f"{self.user.dni} - {self.user.names} {self.user.lastnames}"
