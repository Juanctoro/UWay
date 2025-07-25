from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Count, Func, CharField
from django.db.models.functions import TruncTime
from .models import Reservation
from .serializers import *

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny]

    # Horas más concurridas
    @action(detail=False, methods=['get'])
    def most_requested_hours(self, request):
        reservations = (Reservation.objects
            .filter(reserved_at__isnull=False)
            .annotate(time=TruncHourMinute('reserved_at'))
            .values('time')
            .annotate(total=Count('id'))
            .order_by('-total')[:10]
            )
        
        return Response(reservations)
    
# Esta clase personalizada permite extraer unicamente horas y minutos del TIMESTAMP
class TruncHourMinute(Func):
    function = 'TO_CHAR'
    template = "%(function)s(%(expressions)s, 'HH24:MI')"
    output_field = CharField()
