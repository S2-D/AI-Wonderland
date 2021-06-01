from rest_framework import generics, viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Category, Product, Review
from .serializers import CategorySerializer, ProductSerializer, ReviewSerializer, ProductTop4Serializer
from django.shortcuts import get_object_or_404

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class CategoryList(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny,]

class ProductList(viewsets.ViewSet):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny,]

    param_pcategory_code = openapi.Parameter(
        'pcategory_code',
        openapi.IN_QUERY,
        description='카테고리 코드', 
        type=openapi.TYPE_STRING,
        required=True
    )

    param_ordering = openapi.Parameter(
        'ordering',
        openapi.IN_QUERY, 
        description='정렬 필드', 
        type=openapi.TYPE_STRING,
        required=False
    )

    param_page = openapi.Parameter(
        'page',
        openapi.IN_QUERY, 
        description='페이지 번호', 
        type=openapi.TYPE_STRING,
        required=False
    )

    @swagger_auto_schema(
        manual_parameters = [param_pcategory_code, param_ordering, param_page],
    )
    def list(self, request):
        """
        ProductsList API : 전체 상품 리스트
        ---
        pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
        ordering : 정렬할 필드를 선택하세요. -p_readcount : 조회 순, -p_price : 가격 순, -p_rank : 랭킹 순, -p_date : 등록일 순
        """
        
        ordering = self.request.query_params.get('ordering', None)
        category_code = self.request.query_params.get('pcategory_code', None)
        list_queryset = self.queryset.filter(pcategory_code = category_code)

        if ordering is not None:
            list_queryset = list_queryset.order_by(ordering)

        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(list_queryset, request)
        serializer = ProductSerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Product API : 특정 상품 조회
        ---
        p_no  : 조회할 상품의 asin 을 입력하세요.
        """

        queryset = get_object_or_404(self.queryset, pk=pk)
        queryset.p_readcount += 1
        queryset.save()
        serializer = ProductSerializer(queryset)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ReviewList(viewsets.ReadOnlyModelViewSet):
    
    queryset = Review.objects.all()
    permission_classes = [permissions.AllowAny,]
    serializer_class = ReviewSerializer

    param_p_no = openapi.Parameter(
        'p_no',
        openapi.IN_QUERY,
        description='asin', 
        type=openapi.TYPE_STRING,
        required=True
    )

    @swagger_auto_schema(
        manual_parameters = [param_p_no,],
    )
    def list(self, request):
        """
        ReviewList API : 특정 상품 리뷰 리스트 조회
        ---
        p_no  : 조회할 상품의 asin 을 입력하세요.
        """
        asin = self.request.query_params.get('p_no', None)
        list_queryset = self.queryset.filter(p_no = asin)
        
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(list_queryset, request)
        serializer = ReviewSerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

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
