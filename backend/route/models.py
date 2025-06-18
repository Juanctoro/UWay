from django.contrib.gis.db import models as gis_models
from django.db import models
from trip.models import Trip

class Route(models.Model):
    trip             = models.ForeignKey(
                           Trip,
                           on_delete=models.CASCADE,
                           related_name='routes',
                           null=True
                       )
    duration_minutes = models.PositiveIntegerField('Duration (minutes)')
    distance         = models.FloatField('Distance (km)')
    stops            = gis_models.LineStringField('Stops Line', srid=4326)

    def str(self):
        # muestra el id del Trip y los detalles de la ruta
        return (
            f"Route {self.id} for Trip {self.trip.id}: "
            f"{self.distance} km in {self.duration_minutes} min "
            f"({self.stops.num_coords} puntos)"
        )