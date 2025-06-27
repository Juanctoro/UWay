from django.db import models
from django.conf import settings

def upload_to_soat(instance, filename):
    return f"UWay/files/driver_files/{instance.user.dni}/SOAT_{instance.user.dni}.pdf"

def upload_to_driver_license(instance, filename):
    return f"UWay/files/driver_files/{instance.user.dni}/DRIVER_LICENSE_{instance.user.dni}.pdf"

def upload_to_transit_license(instance, filename):
    return f"UWay/files/driver_files/{instance.user.dni}/TRANSIT_LICENSE_{instance.user.dni}.pdf"


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

    soat_file = models.FileField('SOAT File', upload_to=upload_to_soat, null=True, blank=True)
    driver_license_file = models.FileField('Driver License File', upload_to=upload_to_driver_license, null=True)
    transit_license_file = models.FileField('Transit License File', upload_to=upload_to_transit_license, null=True)

    def __str__(self):
        return f"{self.user.dni} - {self.user.names} - {self.license_number}"
    