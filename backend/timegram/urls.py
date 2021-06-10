from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path('<int:id>/like/', views.like_list),
    path('like/', views.like_post),
    path('timegramList/', views.TimegramList.as_view()),
    path('TimegramCreate/', views.TimegramCreate.as_view())

]