from rest_framework import serializers
from FarpostBackend.settings import AUTH_PASSWORD_VALIDATORS

from metch.models import Metch
from profiles.serializers import UserProfileSerializer


class AdvertSerilizer(serializers.ModelSerializer):
    author = UserProfileSerializer
    recipient = UserProfileSerializer
    class Meta:
        model = Metch
        fields = ['author', 'recipient', 'text']
