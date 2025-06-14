from django.db import models

class Route(models.Model):
    duration_minutes = models.PositiveIntegerField('Duration (minutes)')
    distance         = models.FloatField('Distance (km)')
    stops            = models.PositiveIntegerField('Number of Stops')

    def __str__(self):
        return f"Route {self.id}: {self.distance} km in {self.duration_minutes} min ({self.stops} stops)"