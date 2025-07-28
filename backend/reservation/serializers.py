from rest_framework import serializers
from django.contrib.gis.geos import Point, GEOSGeometry, LineString
from .models import Reservation
from trip.models import Trip

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

    def validate(self, data):
        trip = data['trip']
        pickup_data = data['pickup_point']

        # Convertir pickup_point a GEOSGeometry
        if isinstance(pickup_data, str):
            pickup_point = GEOSGeometry(pickup_data)
        elif isinstance(pickup_data, dict):
            pickup_point = Point(pickup_data['coordinates'], srid=4326)
        else:
            pickup_point = pickup_data  # Ya es GEOSGeometry

        # Validar existencia de ruta
        if not trip.route:
            raise serializers.ValidationError("Trip has no route assigned.")

        # Convertir ruta completa a GEOSGeometry
        route_geom = GEOSGeometry(trip.route.wkt, srid=4326)

        # Validar que esté cerca de la ruta (en cualquier estado)
        max_distance = 20 / 111139  # ≈ 20 metros en grados
        if route_geom.distance(pickup_point) > max_distance:
            raise serializers.ValidationError("Pickup point is too far from the route.")

        # Validación especial si el viaje está en curso
        if trip.status == Trip.STATUS_IN_PROGRESS:
            driver_loc = trip.vehicle.driver.current_location
            if not driver_loc:
                raise serializers.ValidationError("Driver location is not available.")

            # Convertir ubicaciones a GEOSGeometry
            driver_loc = GEOSGeometry(driver_loc.wkt, srid=4326)

            # Obtener todos los puntos de la ruta (MultiLineString -> list of coords)
            coords = []
            for line in trip.route:  # Cada line es una LineString
                coords.extend(line.coords)

            if len(coords) < 2:
                raise serializers.ValidationError("Trip route is too short to validate.")

            # Buscar el punto más cercano a la ubicación del conductor
            driver_coords = (driver_loc.x, driver_loc.y)
            distances = [
                ((lon - driver_coords[0]) ** 2 + (lat - driver_coords[1]) ** 2) ** 0.5
                for lon, lat in coords
            ]
            closest_index = distances.index(min(distances))

            # Ruta restante desde ese punto
            remaining_coords = coords[closest_index:]
            if len(remaining_coords) < 2:
                raise serializers.ValidationError("Remaining route is too short.")

            remaining_line = LineString(remaining_coords, srid=4326)

            # Validar que el punto de recogida esté cerca de la ruta restante
            if remaining_line.distance(pickup_point) > max_distance:
                raise serializers.ValidationError("Pickup point is behind the driver or off the remaining route.")

        data['pickup_point'] = pickup_point
        return data
