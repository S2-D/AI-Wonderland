from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'categotylist', views.CategoryList)

urlpatterns = [
    path('', include(router.urls)),
    path('productlist/', views.ProductList.as_view({'get': 'list'}), name='product-list'),
    path('productlist/<str:pk>/', views.ProductList.as_view({'get': 'retrieve'}), name='product-detail'),
    path('reviewlist/', views.ReviewList.as_view({'get': 'list'}), name='review-list'),
    path('productTop4List/', views.ProductTop4List.as_view({'get': 'list'}), name='producttop4-list'),
]