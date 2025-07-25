from django.db import models
from reservation.models import Reservation

class Review(models.Model):
    reservation = models.OneToOneField(
        Reservation,
        on_delete=models.CASCADE,
        related_name='review',
    )
    comment = models.TextField(blank=True)
    rating = models.FloatField(default=0)

    def __str__(self):
        return f"Review {self.id} for Reservation {self.reservation.id} - "