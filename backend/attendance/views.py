from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import AttendanceSerializer
from .models import Attendance
from member.models import User
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import date, datetime


param_year_month = openapi.Parameter(
    'year_month',
    openapi.IN_QUERY, 
    description='출첵 기록 보고 싶은 년월', 
    type=openapi.TYPE_INTEGER,
    required=True
)

@swagger_auto_schema(
        methods=['get'], 
        manual_parameters=[param_year_month]
    )
@swagger_auto_schema(
        methods=['post'],
    )
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def attendance_info(request):
    """
    GET - year_month: 출첵 기록 보고 싶은 년월(YYYYMM)를 입력하세요.
    """
    if request.method == 'GET':
    #체크하려는 년월 확인 - parameter가 숫자 형태인지
        year_month = request.query_params.get('year_month', None)
        try:
            int(year_month)
        except:
            return Response (
                {
                "status_code": status.HTTP_409_CONFLICT,
                "status": "error",
                "message": "year_month가 숫자 형태 (YYYYMM)이지 않습니다."
                }, status = status.HTTP_409_CONFLICT
            )
    #체크하려는 년월 확인 - 6자리 & 2021년 6월 이후인지
        if int(year_month) < 202106 or int(year_month) > 999999:
            return Response (
                {
                "status_code": status.HTTP_409_CONFLICT,
                "status": "error",
                "message": "년월을 YYYYMM 형태 (202106월 이후)로 기입하시기 바랍니다."
                }, status = status.HTTP_409_CONFLICT
            )
    #체크년월에 대한 출석체크 일자 리턴
        attendanceInfo = Attendance.objects.filter(mem_id = request.user.id, attendance_date__year=year_month[:4], attendance_date__month=year_month[4:]).values_list('attendance_date', flat=True)
        return Response (
                    {
                        "status_code": status.HTTP_200_OK,
                        "status": "success",
                        "data": attendanceInfo
                    }, status = status.HTTP_200_OK
                )

    if request.method == "POST":
    #오늘 날짜로 출석체크 obj 생성
        attendanceInfo = Attendance.objects.filter(mem_id = request.user.id, attendance_date = date.today())
    #해당 일자에 출석체크 했는지 확인
        if len(attendanceInfo)==0:
            data={}
            data['mem_id'] = request.user.id
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