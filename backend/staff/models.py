from django.db import models
from UWay import settings

def upload_to_staff(instance, filename):
    return f"UWay/files/staff_files/{instance.user.dni}/staff_card_{instance.user.dni}.pdf"

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
    is_active = models.BooleanField('Activo', default=False)

    staff_card = models.FileField(verbose_name='Carné de Funcionario', upload_to=upload_to_staff, null=True, blank=True)


    def __str__(self):
        return f"{self.user.dni} - {self.user.names} {self.user.lastnames}"
