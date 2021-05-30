from django.db import models
from django.core.validators import MinLengthValidator
from member.models import User


class Timegram(models.Model):
    title = models.CharField(max_length=50)
    dt_created = models.DateTimeField(
        verbose_name="Date Created", auto_now_add=True)
    dt_modified = models.DateTimeField(
        verbose_name="Date Modified", auto_now=True)
    total_like = models.IntegerField(default=0)
    p_no1 = models.CharField(max_length=20, blank=True)
    p_no2 = models.CharField(max_length=20, blank=True)
    p_no3 = models.CharField(max_length=20, blank=True)
    p_no4 = models.CharField(max_length=20, blank=True)
    p_no5 = models.CharField(max_length=20, blank=True)
    p_no6 = models.CharField(max_length=20, blank=True)
    total_price = models.IntegerField(default=0)
    mem = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name='회원 ID')

    def __str__(self):
        return self.title


class Like(models.Model):
    mem = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name='회원 ID')
    timegram = models.ForeignKey(
        Timegram, on_delete=models.CASCADE, verbose_name='타임그램 ID')
    flag = models.BooleanField(default=True)