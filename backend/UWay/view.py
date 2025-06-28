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
            'student':       reverse('student-list',     request=request, format=format),
            'review':        reverse('review-list',      request=request, format=format),
            'admin_user':    reverse('admin_user-list',  request=request, format=format),
            'reservation':   reverse('reservation-list', request=request, format=format),
        })
