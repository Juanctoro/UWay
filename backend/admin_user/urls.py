from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import AdminUserViewSet

router = DefaultRouter()
router.register(r'', AdminUserViewSet, basename='admin_user')

urlpatterns = [
    path('', include(router.urls)),
]