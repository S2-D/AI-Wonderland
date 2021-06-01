from django.urls import path, include
from .views import mypage_info, sign_up, sign_in, getMoney

urlpatterns = [
    path('<int:id>', mypage_info),
    path('signUp/', sign_up),
    path('signIn/', sign_in),
    path('getMoney/<int:id>', getMoney),
]
