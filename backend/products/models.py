from django.db import models

# 상품카테고리
class Category(models.Model):
    pcategory_code = models.IntegerField(primary_key=True, verbose_name='상품카테고리 코드')
    pcategory_name = models.CharField(max_length=200,  verbose_name='상품카테고리 이름')

# 아마존 상품
class Product(models.Model):
    p_no = models.CharField(max_length=100, primary_key=True, verbose_name='asin')
    p_name = models.CharField(max_length=200, verbose_name='상품명')
    p_price = models.CharField(max_length=100, null=True, verbose_name='상품가격')
    p_brand  = models.CharField(max_length=100, null=True, verbose_name='브랜드')
    p_image = models.CharField(max_length=100, null=True, verbose_name='이미지')
    p_description = models.TextField(null=True, verbose_name='상품설명')
    p_rank = models.CharField(max_length=100, null=True, verbose_name='랭킹')
    p_date = models.CharField(max_length=100, verbose_name='상품등록일')
    p_readcount = models.IntegerField(null=True, verbose_name='상품 조회수')
    p_nlp = models.CharField(max_length=100, null=True, verbose_name='nlp 여부')
    pcategory_code = models.ForeignKey('products.Category', on_delete=models.CASCADE, verbose_name='상품카테고리 코드')
    p_keyword = models.CharField(max_length=200, null=True, verbose_name='상품 반응 키워드')

# 아마존 상품 리뷰
class Review(models.Model):
    review_no = models.IntegerField(primary_key=True, verbose_name='리뷰번호')
    p_no = models.ForeignKey('products.Product', on_delete=models.CASCADE, verbose_name='asin')
    summary = models.TextField(verbose_name='한줄평')
    review_memID = models.CharField(max_length=100, verbose_name='작성자 이름')
    review_content = models.TextField(verbose_name='리뷰내용')
    review_date = models.CharField(max_length=100, verbose_name='작성날짜')
    review_vote = models.CharField(max_length=100, null=True, verbose_name='좋아요')
    review_keyword = models.CharField(max_length=100, null=True, verbose_name='리뷰 키워드')

# 함께 구매한 상품
class Also_bought(models.Model):
    p_no = models.ForeignKey('products.Product', on_delete=models.CASCADE, verbose_name='원상품의 asin')
    search_p_no = models.CharField(max_length=100, verbose_name='함께 구매한 상품')