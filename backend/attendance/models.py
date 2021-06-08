from django.db import models

# Create your models here.

class Attendance(models.Model):
    mem_id = models.ForeignKey('member.User', on_delete=models.CASCADE, verbose_name='회원 ID')
    attendance_date = models.DateField(auto_now_add = True, verbose_name="출석체크일")
    avatar_num = models.IntegerField(null=True, verbose_name="출석체크도장이미지")
