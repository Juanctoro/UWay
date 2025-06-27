from django.contrib.gis.db import models as gis_models
from django.db import models
from django.db.models import Q
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

class TripQuerySet(models.QuerySet):
    def nearby(self, lon, lat, radius=500):
        """
        Devuelve un QuerySet de Trip cuyo start_point, end_point
        o alguna parada (via Route.stops) esté a ≤ radius metros
        del punto (lon, lat).
        """
        user_loc = Point(lon, lat, srid=4326)
        return self.filter(
            Q(start_point__distance_lte=(user_loc, D(m=radius))) |
            Q(end_point__distance_lte=(user_loc, D(m=radius))) |
            Q(routes__stops__distance_lte=(user_loc, D(m=radius)))
        ).distinct()

    def with_nearby_stops(self, lon, lat, radius=500):
        """
        Para cada Trip en el QuerySet, busca dentro de sus rutas
        los coords de stops a ≤ radius metros y devuelve un
        dict { trip_id: [(lon, lat), ...], ... }
        """
        user_loc = Point(lon, lat, srid=4326)
        result = {}
        for trip in self:
            pts = []
            for route in trip.routes.filter(stops__distance_lte=(user_loc, D(m=radius))):
                for lon_p, lat_p in route.stops.coords:
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

    # conectar manager personalizado
    objects = TripQuerySet.as_manager()

    def __str__(self):
        return (
            f"Trip {self.id} for vehicle {self.vehicle.plate} "
            f"from {self.start_point.tuple} to {self.end_point.tuple}"
        )

    @classmethod
    def get_nearby(cls, lon, lat, radius=500):
        """
        Wrapper cómodo: Trip.get_nearby(lon, lat) → QuerySet de trips
        """
        return cls.objects.nearby(lon, lat, radius)

    def nearby_stops(self, lon, lat, radius=500):
        """
        Wrapper de instancia: devuelve lista de (lon, lat) de paradas
        cercanas a este trip
        """
        user_loc = Point(lon, lat, srid=4326)
        pts = []
        for route in self.routes.filter(stops__distance_lte=(user_loc, D(m=radius))):
            for lon_p, lat_p in route.stops.coords:
                if Point(lon_p, lat_p, srid=4326).distance(user_loc) <= radius:
                    pts.append((lon_p, lat_p))
        return pts
