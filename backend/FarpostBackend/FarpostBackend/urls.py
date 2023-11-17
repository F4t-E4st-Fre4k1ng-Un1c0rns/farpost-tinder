from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from profiles.views import UserProfileViewSet, InterestsViewSet
from whiteboard.views import AdvertViewSet


router = routers.DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'interests', InterestsViewSet)
router.register(r'adverts', AdvertViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls))
]

