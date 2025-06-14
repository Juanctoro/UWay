from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Review
from .serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'reservation'
    permission_classes = [AllowAny]