from django.contrib import admin
from django.urls import path, include
from .view import APIRoot

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', APIRoot.as_view(), name='api-root'),

    path('users/',        include('user.urls')),
    path('institutions/', include('institution.urls')),
    path('teachers/',     include('teacher.urls')),
    path('drivers/',      include('driver.urls')),
    path('vehicles/',     include('vehicle.urls')),
    path('trips/',        include('trip.urls')),
    path('routes/',       include('route.urls')),

    path('api-auth/', include('rest_framework.urls')),
]
