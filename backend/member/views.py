from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer, UserCreateSerializer, UserLoginSerializer, UserMoneySerializer

from django.http import JsonResponse
from rest_framework.parsers import JSONParser

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@api_view(['GET'])
def getMoney(request):
    """
    멤버 가상머니 조회
    ---
    """
    if request.method == 'GET':
        try:
            memberInfo = User.objects.filter(pk=request.user.id)
            serializer = UserMoneySerializer(memberInfo, many=True)
            return Response(
                {
                    "money": serializer.data
                }, status=status.HTTP_200_OK
            )
        except:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': '멤버 가상머니 조회 중 에러가 발생했습니다.'
            }, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get')
@api_view(['GET'])
def mypage_info(request):
    """
    마이페이지의 정보 조회(별명, 가상머니)
    ---
    """
    if request.method == 'GET':
        try:
            memberInfo = User.objects.filter(pk=request.user.id)

            if str(memberInfo[0].email) != str(request.user):
                return Response(
                    {
                        "status_code": status.HTTP_401_UNAUTHORIZED,
                        "status": "error",
                        "message": "본인 계정정보만 접근가능합니다."
                    }, status=status.HTTP_401_UNAUTHORIZED
                )

            else:
                serializer = UserSerializer(memberInfo, many=True)
                return Response(
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": serializer.data
                    }, status=status.HTTP_200_OK
                )
        except:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': '마이페이지의 정보 조회 중 에러가 발생했습니다.'
            }, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['post'], request_body=UserCreateSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def sign_up(request):
    """
    멤버 회원가입
    ---
    email : email 형식으로 입력하세요.
    nickname : 멤버 이름을 입력하세요.
    password : 비밀번호는 영문, 숫자, 특수문자를 사용하여 8자리 이상으로 입력하세요.
    """
    if request.method == 'POST':
        try:
            serializer = UserCreateSerializer(data=request.data)

            if not serializer.is_valid(raise_exception=True):
                return Response(
                    {
                        "status_code": status.HTTP_409_CONFLICT,
                        "status": "error",
                        "message": "데이터가 유효하지 않습니다."
                    }, status=status.HTTP_409_CONFLICT
                )

            if User.objects.filter(email=serializer.validated_data['email']).first() is None:
                serializer.save()
                return Response(
                    {
                        "status_code": status.HTTP_201_CREATED,
                        "status": "success",
                        "message": "회원가입이 완료되었습니다."
                    }, status=status.HTTP_201_CREATED
                )
            return Response(
                {
                    "status_code": status.HTTP_409_CONFLICT,
                    "status": "error",
                    "message": "email이 중복되었습니다."
                }, status=status.HTTP_409_CONFLICT
            )
        except:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': '멤버 회원가입 중 에러가 발생했습니다.'
            }, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['post'], request_body=UserLoginSerializer)
@api_view(['POST'])
@permission_classes([AllowAny])
def sign_in(request):
    """
    멤버 로그인
    ---
    email : email을 입력하세요.
    password : 비밀번호를 입력하세요
    """
    if request.method == 'POST':
        try:
            serializer = UserLoginSerializer(data=request.data)

            if not serializer.is_valid(raise_exception=True):
                return Response(
                    {
                        "status_code": status.HTTP_409_CONFLICT,
                        "status": "error",
                        "message": "데이터가 유효하지 않습니다."
                    }, status=status.HTTP_409_CONFLICT
                )
            if serializer.validated_data['email'] == "None":
                return Response(
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "message": "로그인 정보가 일치하지 않습니다."
                    }, status=status.HTTP_200_OK
                )
            return Response(
                {
                    "status_code": status.HTTP_200_OK,
                    "status": "success",
                    "message": "로그인에 성공하였습니다.",
                    "token": serializer.data['token']
                }, status=status.HTTP_200_OK
            )
        except:
            return Response({
                "status_code": status.HTTP_400_BAD_REQUEST,
                'status': 'error',
                'message': '멤버 로그인 중 에러가 발생했습니다.'
            }, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='get')
@api_view(['GET'])
def authenticated_user(request):
    """
    로그인 사용자 정보 조회
    ---
    로그인 후 페이지 redirect 시 사용하세요.
    로그인 후 발급받은 토큰을 headers에 추가하세요.
    Authorization : jwt {access_token}
    """
    try:
        user = {
            "id": request.user.id,
            "email": request.user.email,
            "nickname": request.user.nickname,
            "money": request.user.money,
            "joindate": request.user.joindate,
        }

        return Response(
            {
                "status_code": status.HTTP_200_OK,
                "status": "success",
                "user": user
            }, status=status.HTTP_200_OK
        )
    except:
        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            'status': 'error',
            'message': '로그인 사용자 정보 조회 중 에러가 발생했습니다.'
        }, status=status.HTTP_400_BAD_REQUEST)