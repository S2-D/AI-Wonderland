from rest_framework import generics, viewsets, filters, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Category, Product, Review, Also_bought
from .serializers import CategorySerializer, ProductSerializer, ReviewSerializer, ProductTop4Serializer, AlsoBoughtSerializer
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
    def list(self, request, pcategory_code=None):
        """
        ProductsList API : 전체 상품 리스트
        ---
        pcategory_code : 카테고리 코드를 입력하세요. 1: 상의, 2: 하의, 3: 신발, 4: 기타
        ordering : 정렬할 필드를 선택하세요. -p_readcount : 조회 순(기본, 입력안하면 조회순으로 정렬), -p_price : 가격 높은 순, p_price : 가격 낮은 순, -p_rank : 랭킹 순, -p_date : 등록일 순
        """
        
        category_code = self.request.query_params.get('pcategory_code', None)
        
        try :
            list_queryset = self.queryset.filter(pcategory_code = category_code)
            ordering = self.request.query_params.get('ordering', None)

            if int(category_code) not in [1, 2, 3, 4]:
                return Response({
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    'status': 'error',
                    'message': '카테고리 코드를 다시 확인 해주세요.'
                    }, status = status.HTTP_400_BAD_REQUEST)
            
            if ordering is not None:
                list_queryset = list_queryset.order_by(ordering)

            paginator = PageNumberPagination()
            page = paginator.paginate_queryset(list_queryset, request)
            serializer = ProductSerializer(page, many=True)

            return paginator.get_paginated_response(serializer.data)
        except :
            return Response({
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    'status': 'error',
                    'message': '카테고리 코드는 필수 입력사항 입니다.'
                    }, status = status.HTTP_400_BAD_REQUEST)


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

class ReviewList(viewsets.ViewSet):
    queryset = Review.objects.all()
    permission_classes = [permissions.AllowAny,]

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
    def list(self, request, p_no=None):
        """
        ReviewList API : 특정 상품 리뷰 리스트 조회
        ---
        p_no : 조회할 상품의 asin 을 입력하세요.
        """

        asin = self.request.query_params.get('p_no', None)
        if asin == None:
                return Response({
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    'status': 'error',
                    'message': '조회할 상품의 asin 을 입력하세요.'
                    }, status = status.HTTP_400_BAD_REQUEST)

        list_queryset = self.queryset.filter(p_no = asin)
        
        paginator = PageNumberPagination()
        paginator.page_size = 10
        page = paginator.paginate_queryset(list_queryset.order_by('-review_vote', '-review_date'), request)
        serializer = ReviewSerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

class ProductTop4List(viewsets.ViewSet):
    """
    ProductTop4List API
    """
    queryset = Product.objects.all()
    serializer_class = ProductTop4Serializer
    permission_classes = [permissions.AllowAny,]

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
        category_code = self.request.query_params.get('pcategory_code', None)
        queryset = self.queryset.filter(pcategory_code = category_code)

        if int(category_code) not in [1, 2, 3, 4]:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': '카테고리 코드를 다시 확인 해주세요.'
                }, status = status.HTTP_400_BAD_REQUEST)
        
        queryset = queryset.order_by('-p_readcount')[:4]
        serializer = ProductSerializer(queryset, many=True, read_only=True)
        
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status = status.HTTP_200_OK
                )

class AlsoBoughtList(viewsets.ViewSet):
    """
    AlsoBoughtList API
    """
    queryset = Product.objects.all()
    serializer_class = ProductTop4Serializer
    permission_classes = [permissions.AllowAny,]

    param_p_no = openapi.Parameter(
        'search_p_no',
        openapi.IN_QUERY, 
        description='asin', 
        type=openapi.TYPE_STRING,
        required=True
    )

    @swagger_auto_schema(
        manual_parameters = [param_p_no],
    )
    def list(self, request):
        """
        search_p_no : 조회할 상품의 asin 을 입력하세요.
        """
        asin = self.request.query_params.get('search_p_no', None)

        also_queryset = Also_bought.objects.filter(search_p_no = asin)
        serializer = AlsoBoughtSerializer(also_queryset, many=True)
        
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status = status.HTTP_200_OK
                )

class SearchList(viewsets.ViewSet):
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny,]

    param_p_name = openapi.Parameter(
        'p_name',
        openapi.IN_QUERY,
        description='검색어(상품 이름)', 
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

    @swagger_auto_schema(
        manual_parameters = [param_p_name, param_ordering],
    )
    def list(self, request, p_name=None):
        """
        SearchList API : 검색 결과 리스트
        ---
        p_name : 검색할 단어를 입력하세요 (title)
        ordering : 정렬할 필드를 선택하세요. -p_readcount : 조회 순(기본, 입력안하면 조회순으로 정렬), -p_price : 가격 높은 순, p_price : 가격 낮은 순, -p_rank : 랭킹 순, -p_date : 등록일 순
        """
        
        search_word = self.request.query_params.get('p_name', None)
        # search_word = get_object_or_404(self.queryset, p_name=p_name)
        
        try :
            list_queryset = self.queryset.filter(p_name__icontains = search_word)

            ordering = self.request.query_params.get('ordering', None)
            if ordering is None or ordering == "":
                list_queryset = list_queryset.order_by('-p_readcount')
            else:
                list_queryset = list_queryset.order_by(ordering)

            paginator = PageNumberPagination()
            page = paginator.paginate_queryset(list_queryset, request)
            serializer = ProductSerializer(page, many=True)

            return paginator.get_paginated_response(serializer.data)
        except:
            return Response({
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    'status': 'error',
                    'message': '검색어는 2글자 이상 입력해주세요.'
                    }, status = status.HTTP_400_BAD_REQUEST)