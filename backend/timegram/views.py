from rest_framework import generics, viewsets, status, views, permissions
from rest_framework_jwt import authentication

from .models import Timegram, Like
from .serializers import TimegramListSerializer, TimegramCreateSerializer, LikeCreateSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

headers = openapi.Parameter(
    'Authorization',
    openapi.IN_HEADER,
    description='jwt {access_token}',
    type=openapi.TYPE_STRING,
    required=True
)


class TimegramList(viewsets.ReadOnlyModelViewSet):
    """
    타임그램 전체 조회
    ---
    parameter 없으면 전체 리스트를 가져옵니다.
    page : 조회할 페이지를 입력하세요.(페이지당 20개씩)
    """
    queryset = Timegram.objects.raw(
        """
        SELECT
            *
        FROM timegram_timegram t
        INNER JOIN member_user m
            ON t.mem_id = m.id
        """
    )
    serializer_class = TimegramListSerializer
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.JSONWebTokenAuthentication,)


class TimegramCreate(viewsets.ViewSet):
    """
    TimegramCreate API
    """
    queryset = Timegram.objects.all()
    serializer_class = TimegramCreateSerializer
    authentication_classes = (authentication.JSONWebTokenAuthentication,)

    @swagger_auto_schema(manual_parameters=[headers], request_body=TimegramCreateSerializer,)
    def create(self, request):
        """
        타임그램 등록하기
        ---
        title : timegram title 을 입력하세요.
        p_no : timegram에 등록할 상품의 asin 을 입력하세요. (p_no1 ~ p_no6 모두 입력해야합니다. 값이 없는 경우 '' 을 보내세요.)
        total_price : timegram에 등록될 상품의 총 가격을 입력하세요.
        mem_id : timegram에 등록할 회원 id 를 입력하세요.
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                "status_code": status.HTTP_201_CREATED,
                "status": "success",
                "data": serializer.data,
                'message': 'timegram에 등록되었습니다.'
            }, status=status.HTTP_201_CREATED)

        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            'status': 'error',
            'message': '유효값을 입력해주세요.'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def like_list(request, id):
    """
    선택된 타임그램의 좋아요 개수 조회
    ---
    id : 타임그램의 id를 입력하세요.
    total_like : 해당 타임그램의 좋아요 개수입니다.
    """
    if request.method == 'GET':
        likeList = Like.objects.raw(
            """
                SELECT
                    id,
                    title,
                    (
                        SELECT
                            count(*) AS total_like
                        FROM timegram_like tl 
                        WHERE timegram_id = tt.id
                        AND flag = '1'
                    ) AS total_like
                FROM timegram_timegram tt
                WHERE id = %s
            """, [id]
        )
        if len(likeList) > 0:
            data = {
                "id": likeList[0].id,
                "total_like": likeList[0].total_like
            }
            return Response(
                {
                    "status_code": status.HTTP_200_OK,
                    "status": "success",
                    "data": data
                }, status=status.HTTP_200_OK
            )

        else:
            data = {
                "id": id,
                "total_like": 0
            }
            return Response(
                {
                    "status_code": status.HTTP_200_OK,
                    "status": "success",
                    "data": data
                }, status=status.HTTP_200_OK
            )


@swagger_auto_schema(methods=['post'], manual_parameters=[headers], request_body=LikeCreateSerializer,)
@api_view(['POST'])
def like_post(request):
    """
    타임그램의 좋아요 누르기
    ---
    mem_id : 좋아요를 누르는 멤버 id를 입력하세요.
    timegram_id : 좋아요를 당하는 타임그램의 id를 입력하세요.
    (좋아요 취소 : POST 요청 한번 더 보내기)
    """
    if request.method == 'POST':
        serializer = LikeCreateSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response(
                {
                    "status_code": status.HTTP_409_CONFLICT,
                    "status": "error",
                    "message": "데이터가 유효하지 않습니다."
                }, status=status.HTTP_409_CONFLICT
            )

        serializer.save()
        return Response(
            {
                "status_code": status.HTTP_200_OK,
                "status": "success"
            }, status=status.HTTP_200_OK
        )