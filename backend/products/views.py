from rest_framework import generics, viewsets, filters, permissions, status
from .models import Category, Product, Review
from .serializers import CategorySerializer, ProductSerializer, ReviewSerializer, ProductTop4Serializer
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django_filters import FilterSet
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters, OrderingFilter

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class CategoryList(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny,]

class ProductFilter(FilterSet):
    
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
        model = Product
        fields = ['pcategory_code']

class ProductList(viewsets.ReadOnlyModelViewSet):
    """
    ProductList API
    ---
    parameter 없으면 전체 상품 리스트를 가져옵니다.
    pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
    ordering : 정렬할 필드를 선택해주세요. -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    permission_classes = [permissions.AllowAny,]

    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

class ReviewFilter(FilterSet):
    
    class Meta:
        model = Product
        # fields = '__all__'
        fields = ['p_no']

class ReviewList(viewsets.ReadOnlyModelViewSet):
    """
    ReviewList API
    ---
    parameter 없으면 전체 리뷰 리스트를 가져옵니다.
    p_no : 상품의 asin 을 입력하세요
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    permission_classes = [permissions.AllowAny,]
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['p_no']

class ProductTop4List(viewsets.ViewSet):
    """
    ProductTop4List API
    """
    queryset = Product.objects.all()
    serializer_class = ProductTop4Serializer
    permission_classes = [permissions.AllowAny,]

    def get_queryset(self):
        queryset = self.queryset
        category_code = self.request.query_params.get('pcategory_code', None)

        if category_code:
            queryset = queryset.filter(pcategory_code = category_code)
        return queryset

    param_pcategory_code = openapi.Parameter(
        'pcategory_code',
        openapi.IN_QUERY, 
        description='TOP4 조회할 카테고리 코드', 
        type=openapi.TYPE_STRING,
        required=True
    )

    @swagger_auto_schema(
        manual_parameters = [param_pcategory_code],
        query_serializer = ProductTop4Serializer,
    )
    def list(self, request):
        """
        pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
        """
        qs = self.get_queryset().order_by('-p_readcount')[:4]
        serializer = ProductSerializer(qs, many=True, read_only=True)
        # return Response(serializer.data)
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status = status.HTTP_200_OK
                )

# class AddReadCountAPI(viewsets.ViewSet):
#     """
#     Add ReadCount API
#     """
#     queryset = Products.objects.all()
#     serializer_class = ProductsTop4Serializer
#     permission_classes = [permissions.AllowAny,]

#     def get_queryset(self):
#         queryset = self.queryset
#         category_code = self.request.query_params.get('pcategory_code', None)

#         if category_code:
#             queryset = queryset.filter(pcategory_code = category_code)
#         return queryset

#     param_pcategory_code = openapi.Parameter(
#         'pcategory_code',
#         openapi.IN_QUERY, 
#         description='TOP4 조회할 카테고리 코드', 
#         type=openapi.TYPE_STRING,
#         required=True
#     )

#     @swagger_auto_schema(
#         manual_parameters = [param_pcategory_code],
#         query_serializer = ProductsTop4Serializer,
#     )
#     def list(self, request):
#         """
#         pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
#         """
#         qs = self.get_queryset().order_by('-p_readcount')[:4]
#         serializer = ProductsSerializer(qs, many=True, read_only=True)
#         # return Response(serializer.data)
#         return Response (
#                     {
#                         "status_code": status.HTTP_200_OK,
#                         "status": "success",
#                         "data": serializer.data
#                     }, status = status.HTTP_200_OK
#                 )