from rest_framework import viewsets

from metch.models import Metch
from metch.serializers import MetchSerilizer


class MetchViewSet(viewsets.ModelViewSet):
    queryset = Metch.objects.all()
    serializer_class = MetchSerilizer


# EDIT change state from waiting to accepted or to declined
class MetchViewSet(viewsets.ModelViewSet): 
    queryset = Metch.objects.all()
    serializer_class = MetchSerilizer