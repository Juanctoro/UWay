from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import TripViewSet

router = DefaultRouter()
router.register(r'trip', UserViewSet, basename='trip')

urlpatterns = [
    path('', include(router.urls)),
]
