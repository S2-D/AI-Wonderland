from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, status, views, permissions
from rest_framework.response import Response

from rest_framework_jwt import authentication

from member.models import User
from .models import Scrapbook
from .serializers import ScrapbookSerializer, ScrapbookCRUDSerializer

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class ScrapbookList(viewsets.ViewSet):
    """
    ScrapbookList API
    """
    queryset = Scrapbook.objects.all()
    serializer_class = (ScrapbookSerializer, ScrapbookCRUDSerializer)
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (authentication.JSONWebTokenAuthentication,) 
    
    def list(self, request):
        queryset = self.queryset.filter(mem_id = request.user.id)
        serializer = ScrapbookSerializer(queryset, many=True, read_only=True)
        
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status = status.HTTP_200_OK
                )
    
    @swagger_auto_schema(request_body = ScrapbookCRUDSerializer,)
    def create(self, request):
        """
        p_no : 스크랩북에 등록할 상품의 asin 을 입력하세요.
        """
        current_user = self.request.user
        memberInfo = User.objects.filter(pk=current_user.id)
        
        try :
            if str(memberInfo[0].email) != str(current_user):
                return Response(
                {
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "status": "error",
                    "message": "본인 계정정보만 접근가능합니다."
                }, status=status.HTTP_401_UNAUTHORIZED
            )
            serializer = ScrapbookCRUDSerializer(data = {'mem_id' : current_user.id, 'p_no' : request.data['p_no']})
            
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({
                            "status_code": status.HTTP_201_CREATED,
                            "status": "success",
                            "data": serializer.data,
                            'message': '나의 스크랩북에 추가 되었습니다.'
                        }, status = status.HTTP_201_CREATED )

        except:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': 'p_no 다시 확인하세요.'
                }, status = status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        id : Scarpbook row ID를 입력하세요 (회원 id 아님!!)
        """
        try:
            delete_item = get_object_or_404(Scrapbook, pk=pk)

            if str(delete_item.mem_id) != str(self.request.user):
                return Response(
                {
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "status": "error",
                    "message": "본인 계정정보만 접근가능합니다."
                }, status=status.HTTP_401_UNAUTHORIZED
            )

            delete_item.delete()

            return Response(
                {
                    # Todo : 204 설정시 broken pipe from 127.0.0.1 원인 찾기
                    # "status_code": status.HTTP_204_NO_CONTENT,
                    "status_code": status.HTTP_200_OK,
                    "status": "success",
                    "message": "삭제완료"
                    }, status = status.HTTP_200_OK)
        except:
            return Response(
                {
                    # Todo : 204 설정시 broken pipe from 127.0.0.1 원인 찾기
                    # "status_code": status.HTTP_204_NO_CONTENT,
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "status": "error",
                    "message": "p_no 다시 확인하세요"
                    }, status =status.HTTP_400_BAD_REQUEST)