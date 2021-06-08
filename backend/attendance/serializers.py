from rest_framework import serializers
from .models import Attendance
from datetime import date

class AttendanceSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        attendance_log = Attendance.objects.create (
            mem_id = validated_data['mem_id'],
            attendance_date = date.today(),
            avatar_num = validated_data['avatar_num']
        )
        
        return attendance_log
    
    class Meta:
        model = Attendance
        fields = ('mem_id', 'attendance_date', 'avatar_num')

class AttendanceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'