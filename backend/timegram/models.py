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
    p_no1 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품1 ID', related_name='p_no1', null=True, blank=True)
    p_no2 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품2 ID', related_name='p_no2', null=True, blank=True)
    p_no3 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품3 ID', related_name='p_no3', null=True, blank=True)
    p_no4 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품4 ID', related_name='p_no4', null=True, blank=True)
    p_no5 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품5 ID', related_name='p_no5', null=True, blank=True)
    p_no6 = models.ForeignKey(
        'products.Product', on_delete=models.CASCADE, verbose_name='상품6 ID', related_name='p_no6', null=True, blank=True)
    total_price = models.FloatField(default=0)
    mem = models.ForeignKey(
        'member.User', on_delete=models.CASCADE, verbose_name='회원 ID')

    def __str__(self):
        return self.title


class Like(models.Model):
    mem = models.ForeignKey(
        'member.User', on_delete=models.CASCADE, verbose_name='회원 ID')
    timegram = models.ForeignKey(
        'timegram.Timegram', on_delete=models.CASCADE, verbose_name='타임그램 ID')
    flag = models.BooleanField(default=True)