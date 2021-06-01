from rest_framework import generics, viewsets, status, views, permissions
from rest_framework_jwt import authentication
from .models import Scrapbook
from .serializers import ScrapbookSerializer
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class ScrapbookList(viewsets.ViewSet):
    """
    ScrapbookList API
    """
    queryset = Scrapbook.objects.all()
    serializer_class = ScrapbookSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.JSONWebTokenAuthentication,) 
    
    def get_queryset(self):
        queryset = self.queryset
        user_id = self.request.query_params.get('mem_id', None)

        if user_id:
            queryset = queryset.filter(mem_id = user_id)

        return queryset
    
    param_mem_id = openapi.Parameter(
        'mem_id',
        openapi.IN_QUERY, 
        description='스크랩 리스트를 가져올 회원 id', 
        type=openapi.TYPE_INTEGER,
        required=True
    )

    param_p_no = openapi.Parameter(
        'p_no',
        openapi.IN_QUERY, 
        description='여긴 입력하지 마세요! (수정예정)', 
        type=openapi.TYPE_STRING,
        required=False
    )
    
    @swagger_auto_schema(
        manual_parameters = [param_mem_id, param_p_no],
        query_serializer = ScrapbookSerializer,
    )
    def list(self, request):
        """
        mem_id : 스크랩 리스트를 가져올 회원 id 를 입력하세요.
        """
        qs = self.get_queryset()
        serializer = ScrapbookSerializer(qs, many=True, read_only=True)
        # return Response(serializer.data)
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status = status.HTTP_200_OK
                )
    
    @swagger_auto_schema(request_body = ScrapbookSerializer,)
    def create(self, request):
        """
        mem_id : 스크랩북에 등록할 회원 id 를 입력하세요.
        p_no : 스크랩북에 등록할 상품의 asin 을 입력하세요.
        """
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                        "status_code": status.HTTP_201_CREATED,
                        "status": "success",
                        "data": serializer.data,
                        'message': '스크랩북에 추가되었음'
                    }, status = status.HTTP_201_CREATED )

        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            'status': 'error',
            'message': 'member id 와 asin 입력 필요함'
            }, status = status.HTTP_400_BAD_REQUEST)

