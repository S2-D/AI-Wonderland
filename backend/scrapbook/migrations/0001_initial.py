# Generated by Django 3.2.3 on 2021-05-27 09:38

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Scrapbook',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scrap_date', models.DateTimeField(default=datetime.datetime.now, verbose_name='스크랩북 추가일')),
                ('mem_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='회원 ID')),
                ('p_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.products', verbose_name='asin')),
            ],
        ),
    ]
