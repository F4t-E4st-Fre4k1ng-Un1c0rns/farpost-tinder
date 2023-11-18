from rest_framework import serializers
from FarpostBackend.settings import AUTH_PASSWORD_VALIDATORS

from metch.models import Metch
from profiles.serializers import UserSerializer


class MetchSerializer(serializers.ModelSerializer):
    author = UserSerializer
    recipient = UserSerializer
    class Meta:
        model = Metch
        fields = ['id', 'author', 'recipient', 'message', 'state']
