from rest_framework import permissions, viewsets
from rest_framework.generics import CreateAPIView

from profiles.models import User, Interest, City
from profiles.serializers import (UserSerializer, 
                                InterestSerializer,
                                CitySerializer)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]


class CreateUserProfileView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class InterestsViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    #permission_classes = [permissions.IsAuthenticated]

