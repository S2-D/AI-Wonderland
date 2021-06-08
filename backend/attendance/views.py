from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import AttendanceSerializer, AttendanceInfoSerializer
from .models import Attendance
from member.models import User
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import date, datetime
from rest_framework.pagination import PageNumberPagination
import random

# param_year_month = openapi.Parameter(
#     'year_month',
#     openapi.IN_QUERY, 
#     description='출첵 기록 보고 싶은 년월', 
#     type=openapi.TYPE_INTEGER,
#     required=True
# )

param_page = openapi.Parameter(
    'page',
    openapi.IN_QUERY, 
    description='페이지 번호', 
    type=openapi.TYPE_STRING,
    required=False
)

@swagger_auto_schema(
        methods=['get'], 
        manual_parameters=[param_page]
    )
@swagger_auto_schema(
        methods=['post'],
    )
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def attendance_info(request):
    if request.method == 'GET':
    # 출석체크 pagination 리턴
        paginator = PageNumberPagination()
        paginator.page_size = 5
        attendanceInfo = Attendance.objects.filter(mem_id = request.user.id).order_by('-attendance_date')
        page = paginator.paginate_queryset(attendanceInfo, request)
        serializer = AttendanceInfoSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    if request.method == "POST":
    #오늘 날짜로 출석체크 obj 생성
        attendanceInfo = Attendance.objects.filter(mem_id = request.user.id, attendance_date = date.today())
    #해당 일자에 출석체크 했는지 확인
        if len(attendanceInfo)==0:
            data={}
            data['mem_id'] = request.user.id
            data['avatar_num'] = random.randint(0,99)
            serializer = AttendanceSerializer(data = data)
    #serializer로 validation, 성공시 출첵
            if serializer.is_valid(raise_exception=True):
                memberInfo = User.objects.get(pk=request.user.id)
                memberInfo.money += 300
                memberInfo.save() 
                serializer.save()
                return Response (
                    {
                        "status_code": status.HTTP_201_CREATED,
                        "status": "success",
                        "data": serializer.data,
                        "message": "출석체크 성공."
                    }, status = status.HTTP_201_CREATED
                )
            else:
                return Response (
                    {
                    "status_code": status.HTTP_409_CONFLICT,
                    "status": "error",
                    "message": "데이터가 유효하지 않습니다."
                    }, status = status.HTTP_409_CONFLICT
                )  
        else:
            return Response (
                {
                    "status_code": status.HTTP_409_CONFLICT,
                    "status": "error",
                    "message": "오늘은 이미 출석체크를 완료했습니다."
                }, status = status.HTTP_409_CONFLICT
            )