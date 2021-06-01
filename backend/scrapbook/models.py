from django.db import models
from datetime import datetime

# 스크랩북
class Scrapbook(models.Model):
    mem_id = models.ForeignKey('member.User', on_delete=models.CASCADE, verbose_name='회원 ID')
    p_no = models.ForeignKey('products.Product', on_delete=models.CASCADE, verbose_name='asin')
    scrap_date = models.DateTimeField(default=datetime.now, verbose_name='스크랩북 추가일')