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
    filter_backends = (DjangoFilterBackend)
    search_fields = ('first_name', 'last_name')
    filterset_fields = ('interests', 'city')
    #permission_classes = [permissions.IsAuthenticated]


class CreateUserProfileView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class InterestsViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    #permission_classes = [permissions.IsAuthenticated]

