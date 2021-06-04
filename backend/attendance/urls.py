from django.urls import path, include
from .views import attendance_info

urlpatterns = [
    path('', attendance_info),
]
