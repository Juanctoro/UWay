from rest_framework import serializers
from .models import User
from student.models import Student
from staff.models import Staff
from teacher.models import Teacher
from driver.models import Driver
from admin_user.models import Admin_User

class UserSerializer(serializers.ModelSerializer):
    # recibir password en claro, no devolverlo
    password = serializers.CharField(write_only=True)
    roles = serializers.SerializerMethodField()
    requests = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'dni', 'names', 'lastnames',
            'phone', 'address',
            'email', 'institutional_email',
            'institution', 'password','roles','requests'
        ]

    def get_roles(self, obj):
        roles = []
        student_obj = Student.objects.filter(user=obj).first()
        staff_obj = Staff.objects.filter(user=obj).first()
        teacher_obj = Teacher.objects.filter(user=obj).first()
        driver_obj = Driver.objects.filter(user=obj).first()
        admin_obj = Admin_User.objects.filter(user=obj).first()

        if student_obj and student_obj.is_active:
            roles.append("student")
        if staff_obj and staff_obj.is_active:
            roles.append("staff")
        if teacher_obj and teacher_obj.is_active:
            roles.append("teacher")
        if driver_obj and driver_obj.is_approved:
            roles.append("driver")
        if admin_obj and admin_obj.is_active:
            roles.append("admin")
        return roles

    def get_requests(self, obj):
        requests = []
        student_obj = Student.objects.filter(user=obj).first()
        staff_obj = Staff.objects.filter(user=obj).first()
        teacher_obj = Teacher.objects.filter(user=obj).first()
        driver_obj = Driver.objects.filter(user=obj).first()
        admin_obj = Admin_User.objects.filter(user=obj).first()

        if student_obj and not student_obj.is_active:
            requests.append("student")
        if staff_obj and not staff_obj.is_active:
            roles.append("staff")
        if teacher_obj and not teacher_obj.is_active:
            requests.append("teacher")
        if driver_obj and not driver_obj.is_approved:
            requests.append("driver")
        if admin_obj and not admin_obj.is_active:
            requests.append("admin")
        return requests

    def create(self, validated_data):
        pwd = validated_data.pop('password')
        # Asignamos username igual al dni para evitar UNIQUE constraint
        validated_data['username'] = validated_data['dni']
        user = User(**validated_data)
        user.set_password(pwd)
        user.save()
        return user

    def update(self, instance, validated_data):
        # Si cambias el dni, actualizamos username también
        if 'dni' in validated_data:
            instance.username = validated_data['dni']
        if 'password' in validated_data:
            pwd = validated_data.pop('password')
            instance.set_password(pwd)
        return super().update(instance, validated_data)
    
class UserTotalReservationsSerializer(serializers.ModelSerializer):
    total_reservations = serializers.IntegerField()

    class Meta:
        model = User
        fields = ['dni', 'names', 'total_reservations']