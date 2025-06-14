"""
URL configuration for UWay project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# proyecto/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from admin_user.views import AdminUserViewSet
from student.views import StudentViewSet
from user.views import UserViewSet
from institution.views import InstitutionViewSet
from teacher.views import TeacherViewSet
from driver.views import DriverViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet,    basename='user')
router.register(r'institution', InstitutionViewSet, basename='institution')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'drivers', DriverViewSet, basename='driver')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'admin_users', AdminUserViewSet, basename='admin_user')

urlpatterns = [
    path('admin/', admin.site.urls),
    # aquí monta TODO el router
    path('', include(router.urls)),
    # opcional: login/logout en la browsable API
    path('api-auth/', include('rest_framework.urls')),
]
