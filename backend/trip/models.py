from django.contrib.gis.db import models as gis_models
from django.db import models
from vehicle.models import Vehicle

class Trip(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name='trips'
    )
    start_point = gis_models.PointField('Start Point', srid=4326)
    end_point   = gis_models.PointField('End Point',   srid=4326)
    qr_url      = models.URLField('QR Code URL', max_length=200, blank=True)

    def str(self):
        return (
            f"Trip {self.id} for vehicle {self.vehicle.plate} "
            f"from {self.start_point.tuple} to {self.end_point.tuple}"
        )