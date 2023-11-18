from rest_framework import viewsets

from metch.models import Metch
from metch.serializers import MetchSerilizer


class MetchViewSet(viewsets.ModelViewSet):
    queryset = Metch.objects.all()
    serializer_class = MetchSerilizer

# delete metch, because declined
class MetchViewSet(viewsets.ModelViewSet):
    queryset = Metch.objects.all()
    serializer_class = MetchSerilizer

# change state from waiting to accepted
class MetchViewSet(viewsets.ModelViewSet): 
    queryset = Metch.objects.all()
    serializer_class = MetchSerilizer