from rest_framework import viewsets

from whiteboard.models import Advert
from whiteboard.serializers import AdvertSerilizer


class AdvertViewSet(viewsets.ModelViewSet):
    queryset = Advert.objects.all()
    serializer_class = AdvertSerilizer
