from django.contrib.gis.db import models as gis_models
from django.db import models
from vehicle.models import Vehicle

class Trip(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name='trips'
    )
    start_point = models.CharField('Start point', max_length=150)
    end_point   = models.CharField('End Point', max_length=150)
    qr_url      = models.URLField('QR Code URL', max_length=200, blank=True)

    def __str__(self):
        return f"Trip {self.id} for vehicle {self.vehicle.plate} from {self.start_point} to {self.end_point}"