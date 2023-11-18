from rest_framework import viewsets

from metch.models import Metch
from metch.serializers import AdvertSerilizer


class AdvertViewSet(viewsets.ModelViewSet):
    queryset = Metch.objects.all()
    serializer_class = AdvertSerilizer