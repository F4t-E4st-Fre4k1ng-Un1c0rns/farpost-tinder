from django.db import models
from django.contrib.auth.models import User
from rest_framework.serializers import ImageField

from FarpostBackend.settings import MEDIA_PATH


class Interests(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


#username is telegram nickname
class UserProfile(User):
    profile_picture = models.ImageField(upload_to=MEDIA_PATH)
    bio = models.CharField(max_length=300)
    interests = models.ManyToManyField(Interests)
    
