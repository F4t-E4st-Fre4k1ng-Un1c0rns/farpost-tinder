from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from FarpostBackend.settings import MEDIA_ROOT, MEDIA_URL
from django.conf.urls.static import static
from profiles.views import (UserProfileViewSet, InterestsViewSet, 
                            CreateUserProfileView, CityViewSet,
                            MeViewSet,)
from whiteboard.views import AdvertViewSet
from metch.views import MetchViewSet, MetchView


router = routers.DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'me', MeViewSet, basename='current_user')
router.register(r'interests', InterestsViewSet)
router.register(r'adverts', AdvertViewSet)
router.register(r'city', CityViewSet)
router.register(r'metch', MetchViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profiles/create', CreateUserProfileView.as_view()),
    path('api/metch/<int:id>/', MetchView.as_view()),
    path('api/', include(router.urls)),
] + static(MEDIA_URL, document_root=MEDIA_ROOT)

