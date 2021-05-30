from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'timegramList', views.TimegramList)
router.register(r'timegramCreate', views.TimegramCreate)


urlpatterns = [
    path('', include(router.urls)),
    path('like/<int:id>', views.likeList),
    path('like/', views.likePost),
]