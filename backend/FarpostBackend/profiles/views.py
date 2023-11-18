from rest_framework import permissions, viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.serializers import DjangoModelField
from django_filters.rest_framework import DjangoFilterBackend

from profiles.models import User, Interest, City
from profiles.serializers import (UserSerializer,
                                InterestSerializer,
                                CitySerializer)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]


class MeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


class CreateUserProfileView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class InterestsViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    #permission_classes = [permissions.IsAuthenticated]


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    #permission_classes = [permissions.IsAuthenticated]

