from rest_framework import permissions, viewsets
from rest_framework.generics import CreateAPIView

from profiles.models import UserProfile, Interests
from profiles.serializers import (UserProfileSerializer, 
                                InterestSerializer,
                                )


class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class CreateUserProfileView(CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]


class InterestsViewSet(viewsets.ModelViewSet):
    queryset = Interests.objects.all()
    serializer_class = InterestSerializer
    #permission_classes = [permissions.IsAuthenticated]

