# Generated by Django 3.2.3 on 2021-06-11 04:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('pcategory_code', models.IntegerField(primary_key=True, serialize=False, verbose_name='상품카테고리 코드')),
                ('pcategory_name', models.CharField(max_length=200, verbose_name='상품카테고리 이름')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('p_no', models.CharField(max_length=100, primary_key=True, serialize=False, verbose_name='asin')),
                ('p_name', models.CharField(max_length=200, verbose_name='상품명')),
                ('p_price', models.CharField(max_length=100, null=True, verbose_name='상품가격')),
                ('p_brand', models.CharField(max_length=100, null=True, verbose_name='브랜드')),
                ('p_image', models.CharField(max_length=100, null=True, verbose_name='이미지')),
                ('p_description', models.TextField(null=True, verbose_name='상품설명')),
                ('p_rank', models.CharField(max_length=100, null=True, verbose_name='랭킹')),
                ('p_date', models.CharField(max_length=100, verbose_name='상품등록일')),
                ('p_readcount', models.IntegerField(null=True, verbose_name='상품 조회수')),
                ('p_nlp', models.CharField(max_length=100, null=True, verbose_name='nlp 여부')),
                ('p_keyword', models.CharField(max_length=200, null=True, verbose_name='상품 반응 키워드')),
                ('pcategory_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.category', verbose_name='상품카테고리 코드')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('review_no', models.IntegerField(primary_key=True, serialize=False, verbose_name='리뷰번호')),
                ('summary', models.TextField(verbose_name='한줄평')),
                ('review_memID', models.CharField(max_length=100, verbose_name='작성자 이름')),
                ('review_content', models.TextField(verbose_name='리뷰내용')),
                ('review_date', models.CharField(max_length=100, verbose_name='작성날짜')),
                ('review_vote', models.CharField(max_length=100, null=True, verbose_name='좋아요')),
                ('review_keyword', models.CharField(max_length=100, null=True, verbose_name='리뷰 키워드')),
                ('p_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='asin')),
            ],
        ),
        migrations.CreateModel(
            name='Also_bought',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('search_p_no', models.CharField(max_length=100, verbose_name='함께 구매한 상품')),
                ('p_no', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='원상품의 asin')),
            ],
        ),
    ]
