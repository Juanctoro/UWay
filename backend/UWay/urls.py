from django.contrib import admin
from django.urls import path, include
from .view import APIRoot
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', APIRoot.as_view(), name='api-root'),

    path('users/',                  include('user.urls')),
    path('institutions/',           include('institution.urls')),
    path('teachers/',               include('teacher.urls')),
    path('drivers/',                include('driver.urls')),
    path('vehicles/',               include('vehicle.urls')),
    path('trips/',                  include('trip.urls')),
    path('students/',               include('student.urls')),
    path('staff/',                  include('staff.urls')),
    path('admin_users/',            include('admin_user.urls')),
    path('reviews/',                include('review.urls')),
    path('reservations/',           include('reservation.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    path('api-auth/', include('rest_framework.urls')),
]
