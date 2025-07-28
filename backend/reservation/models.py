from django.db import models
from django.conf import settings
from trip.models import Trip
from django.contrib.gis.db import models as gis_models

class Reservation(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='reservations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservations')
    pickup_point = gis_models.PointField(null=True, blank=True, srid=4326)
    observation = models.TextField(blank=True)
    has_boarded = models.BooleanField(default=False)
    boarded_at = models.DateTimeField(null=True, blank=True)
    reserved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Reservation {self.id} for trip {self.trip.id} by user {self.user}"

