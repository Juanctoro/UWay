from django.db import models
from trip.models import Trip

class Reservation(models.Model):
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='reservation'
    )
    observation = models.TextField(blank=True)

    def __str__(self):
        return f"Reservation {self.id} for trip {self.trip.id}"

