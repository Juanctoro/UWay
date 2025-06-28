from django.contrib.gis.db import models as gis_models
from django.db import models
from django.db.models import Q
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

class TripQuerySet(models.QuerySet):
    def nearby(self, lon, lat, radius=500):
        """
        Devuelve un QuerySet de Trip cuyo start_point, end_point
        o su líneas de ruta (route) esté a ≤ radius metros
        del punto (lon, lat).
        """
        user_loc = Point(lon, lat, srid=4326)
        return self.filter(
            Q(start_point__distance_lte=(user_loc, D(m=radius))) |
            Q(end_point__distance_lte=(user_loc, D(m=radius)))   |
            Q(route__distance_lte=(user_loc, D(m=radius)))
        ).distinct()

    def with_nearby_stops(self, lon, lat, radius=500):
        """
        Para cada Trip en el QuerySet, recorre los vértices de su LineString
        y devuelve un dict { trip_id: [(lon, lat), ...], ... } con los puntos
        que están a ≤ radius metros de (lon, lat).
        """
        user_loc = Point(lon, lat, srid=4326)
        result = {}
        for trip in self:
            pts = []
            if trip.route:  # si existe geometría de ruta
                for lon_p, lat_p in trip.route.coords:
                    if Point(lon_p, lat_p, srid=4326).distance(user_loc) <= radius:
                        pts.append((lon_p, lat_p))
            if pts:
                result[trip.id] = pts
        return result

class Trip(models.Model):
    vehicle     = models.ForeignKey('vehicle.Vehicle', on_delete=models.CASCADE, related_name='trips')
    start_point = gis_models.PointField('Start Point', srid=4326)
    end_point   = gis_models.PointField('End Point',   srid=4326)
    qr_url      = models.URLField('QR Code URL', max_length=200, blank=True)
    route = gis_models.MultiLineStringField('Route Geometry', srid=4326, blank=True, null=True)
    duration    = models.PositiveIntegerField('Duration (minutes)', blank=True, null=True)
    distance    = models.FloatField('Distance (km)', blank=True, null=True)

    # --- Trip status options ---
    STATUS_SCHEDULED    = 'scheduled'
    STATUS_IN_PROGRESS  = 'in_progress'
    STATUS_COMPLETED    = 'completed'
    STATUS_CHOICES = [
        (STATUS_SCHEDULED,    'Scheduled'),
        (STATUS_IN_PROGRESS,  'In Progress'),
        (STATUS_COMPLETED,    'Completed'),
    ]
    # --------------------------
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_SCHEDULED,
        help_text="Current status of the trip"
    )

    # conectar manager personalizado
    objects = TripQuerySet.as_manager()

    def __str__(self):
        return (
            f"Trip {self.id} for vehicle {self.vehicle.plate} "
            f"from {self.start_point.tuple} to {self.end_point.tuple}"
            f"Status {self.status}"
        )

    @classmethod
    def get_nearby(cls, lon, lat, radius=500):
        return cls.objects.nearby(lon, lat, radius)

    def nearby_stops(self, lon, lat, radius=500):
        """
        Wrapper de instancia: lista de vértices de self.route
        dentro del radio.
        """
        user_loc = Point(lon, lat, srid=4326)
        pts = []
        if self.route:
            for lon_p, lat_p in self.route.coords:
                if Point(lon_p, lat_p, srid=4326).distance(user_loc) <= radius:
                    pts.append((lon_p, lat_p))
        return pts
