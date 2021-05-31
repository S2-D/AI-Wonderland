from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'categotylist', views.CategoryList)
router.register(r'productlist', views.ProductList)
router.register(r'productlist2', views.ProductList2)
router.register(r'reviewlist', views.ReviewList)
router.register(r'productTop4List', views.ProductTop4List)

urlpatterns = [
    path('', include(router.urls)),
]