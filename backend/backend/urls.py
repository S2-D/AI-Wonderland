from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
   openapi.Info(
      title="엘리스 AI 프로젝트 API",
      default_version='v1',
      description="설명 추가 예정",
      contact=openapi.Contact(email="ms.sseul@gmail.com"),
    #   license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
#    authentication_classes=(UserTokenAuthBackend,)
)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/member/', include('member.urls')),
    path('api/timegram/', include('timegram.urls')),


    path('api/products/', include('products.urls')),
    path('api/scrapbook/', include('scrapbook.urls')),
    # swagger setting
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
