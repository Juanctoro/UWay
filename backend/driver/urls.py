from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import DriverViewSet
from .views import update_location

router = DefaultRouter()
router.register(r'', DriverViewSet, basename='driver')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:driver_id>/update-location/', update_location),
]
