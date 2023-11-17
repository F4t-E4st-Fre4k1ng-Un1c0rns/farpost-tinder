from rest_framework import serializers
from FarpostBackend.settings import AUTH_PASSWORD_VALIDATORS

from whiteboard.models import Advert
from profiles.serializers import UserProfileSerializer


class AdvertSerilizer(serializers.ModelSerializer):
    author= UserProfileSerializer
    class Meta:
        model = Advert
        fields = ['x_coordinates', 'y_coordinates', 'title', 'text']
