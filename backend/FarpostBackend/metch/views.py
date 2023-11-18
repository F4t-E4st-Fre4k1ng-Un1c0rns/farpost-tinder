from django.http import Http404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from metch.models import Metch
from metch.serializers import MetchSerializer


class MetchViewSet(viewsets.ModelViewSet):
    queryset = Metch.objects.all()
    serializer_class = MetchSerializer
    #permission_classes = [permissions.IsAuthenticated]


class MetchView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, id):
        try:
            return Metch.objects.get(id=id)
        except Metch.DoesNotExist:
            raise Http404
    

    def get(self, request, id, format=None):
        snippet = self.get_object(id)
        serializer = MetchSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        snippet = self.get_object(id)
        serializer = MetchSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        snippet = self.get_object(id)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
