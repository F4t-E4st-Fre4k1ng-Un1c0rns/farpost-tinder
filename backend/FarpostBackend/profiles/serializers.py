from rest_framework import serializers

from profiles.models import User, Interest, City


class InterestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']


class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    interests = serializers.StringRelatedField(many=True, required=False)
    city = serializers.StringRelatedField(required=False)
    class Meta:
        model = User
        fields = ['username', 'profile_picture',
                'first_name', 'last_name', 'city',
                'bio', 'interests']



