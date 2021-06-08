from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.mypage_info),
    path('signUp/', views.sign_up),
    path('signIn/', views.sign_in),
    path('auth/', views.authenticated_user),
    path('getMoney/', views.getMoney),
]