from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models import Count
from .models import User
from .serializers import *
from trip.models import Trip
from reservation.models import Reservation
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'dni'            # usaremos /user/{dni}/
    permission_classes = [permissions.AllowAny]

    # Rervas hechas por un usuario específico
    @action(detail=True, methods=['get'])
    def user_reservations(self, request, dni=None):
        user = self.get_object()
        total = Reservation.objects.filter(user_id=dni).count()

        return Response({
            'user_dni': user.dni,
            'total_reservations': total
            })
    
    # Reservas hechas por cada usuario
    @action(detail=False, methods=['get'])
    def total_reservations(self, request):
        users = (User.objects
                 .annotate(total_reservations=Count('reservations'))
                 .order_by('-total_reservations')
                 .exclude(total_reservations=0)
            )

        serializer = UserTotalReservationsSerializer(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'], permission_classes=[permissions.AllowAny], url_path='login')
    def login(self, request):
        """
        POST /api/users/login/
        Recibe { dni, password } y devuelve { token, user }.
        """
        dni = request.data.get('dni') or request.data.get('username')
        pwd = request.data.get('password')
        user = authenticate(username=dni, password=pwd)
        if not user:
            return Response(
                {'detail': 'Credenciales inválidas'},
                status=status.HTTP_400_BAD_REQUEST
            )
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {'token': token.key, 'user': UserSerializer(user).data},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        return Response(self.get_serializer(request.user).data)