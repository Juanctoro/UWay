from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny

class APIRoot(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        return Response({
            'users':         reverse('user-list',        request=request, format=format),
            'institutions':  reverse('institution-list', request=request, format=format),
            'teachers':      reverse('teacher-list',     request=request, format=format),
            'drivers':       reverse('driver-list',      request=request, format=format),
            'vehicles':      reverse('vehicle-list',     request=request, format=format),
            'trips':         reverse('trip-list',        request=request, format=format),
            'routes':        reverse('route-list',       request=request, format=format),
        })
