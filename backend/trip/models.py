from django.contrib.gis.db import models as gis_models
from django.db import models
from django.db.models import Q
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

class TripQuerySet(models.QuerySet):
    def nearby(self, lon, lat, radius=500):
        """
        Devuelve un QuerySet de Trip cuya ruta (route)
        esté a ≤ radius metros del punto (lon, lat).
        """
        user_loc = Point(lon, lat, srid=4326)
        return self.filter(
            route__distance_lte=(user_loc, D(m=radius))
        ).distinct()

    def with_nearby_stops(self, lon, lat, radius=500):
        """
        Para cada Trip en el QuerySet, recorre los vértices de su ruta (route)
        y devuelve un dict { trip_id: [(lon, lat), ...], ... } con los puntos
        que están a ≤ radius metros de (lon, lat).
        """
        user_loc = Point(lon, lat, srid=4326)
        result = {}
        for trip in self:
            pts = []
            if trip.route:  # si existe geometría de ruta
                for line in trip.route:  # cada LineString dentro del MultiLineString
                    for lon_p, lat_p in line.coords:
                        if Point(lon_p, lat_p, srid=4326).distance(user_loc) <= radius:
                            pts.append((lon_p, lat_p))
            if pts:
                result[trip.id] = pts
        return result

class Trip(models.Model):
    vehicle     = models.ForeignKey('vehicle.Vehicle', on_delete=models.CASCADE, related_name='trips')
    qr_url      = models.URLField('QR Code URL', max_length=200, blank=True)
    route       = gis_models.MultiLineStringField('Route Geometry', srid=4326, blank=True, null=True)
    duration    = models.PositiveIntegerField('Duration (minutes)', blank=True, null=True)
    distance    = models.FloatField('Distance (km)', blank=True, null=True)
    start_time  = models.DateTimeField('Hora de inicio', blank=True, null=True)

    STATUS_SCHEDULED    = 'scheduled'
    STATUS_IN_PROGRESS  = 'in_progress'
    STATUS_COMPLETED    = 'completed'
    STATUS_CHOICES = [
        (STATUS_SCHEDULED,    'Scheduled'),
        (STATUS_IN_PROGRESS,  'In Progress'),
        (STATUS_COMPLETED,    'Completed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_SCHEDULED)
    deviation_detected = models.BooleanField(default=False)

    objects = TripQuerySet.as_manager()

    def __str__(self):
        return f"Trip {self.id} for vehicle {self.vehicle.plate} Status {self.status}"

    @classmethod
    def get_nearby(cls, lon, lat, radius=500):
        user_loc = Point(lon, lat, srid=4326)
        return cls.objects.filter(route__distance_lte=(user_loc, D(m=radius))).distinct()

    def nearby_stops(self, lon, lat, radius=500):
        user_loc = Point(lon, lat, srid=4326)
        pts = []
        if self.route:
            for line in self.route:
                for lon_p, lat_p in line.coords:
                    if Point(lon_p, lat_p, srid=4326).distance(user_loc) <= radius:
                        pts.append((lon_p, lat_p))
        return pts
