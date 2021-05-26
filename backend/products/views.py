from rest_framework import generics, viewsets, filters, permissions
from .models import Category, Products, Review
from .serializers import CategorySerializer, ProductsSerializer, ReviewSerializer

from django_filters import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters, OrderingFilter

class CategoryList(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny,]

class ProductsFilter(FilterSet):
    
    ordering = filters.OrderingFilter( 
        fields=( 
            ('p_readcount', 'p_readcount'),
            ('p_price', 'p_price'),
            ('p_rank', 'p_rank'),
            ('p_date', 'p_date'),
        ),
        field_labels={
            'p_readcount': '조회 순',
            'p_price'    : '가격 순',
            'p_rank'     : '랭킹 순',
            'p_date'     : '등록일 순',
        }
    )

    class Meta:
        model = Products
        fields = ['pcategory_code']

class ProductsList(viewsets.ReadOnlyModelViewSet):
    """
    ProductsList API
    ---
    parameter 없으면 전체 리스트를 가져옵니다.
    pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
    ordering : 정렬할 필드를 선택해주세요. -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    
    permission_classes = [permissions.AllowAny,]

    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductsFilter
    
class ReviewFilter(FilterSet):
    
    class Meta:
        model = Products
        # fields = '__all__'
        fields = ['p_no']

class ReviewList(viewsets.ReadOnlyModelViewSet):
    """
    ReviewList API
    ---
    parameter 없으면 전체 리스트를 가져옵니다.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    permission_classes = [permissions.AllowAny,]
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['p_no']