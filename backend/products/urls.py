from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'categotylist', views.CategoryList)
router.register(r'productslist', views.ProductsList)
router.register(r'reviewlist', views.ReviewList)

urlpatterns = [
    path('', include(router.urls)),
]