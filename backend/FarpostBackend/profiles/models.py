from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.serializers import ImageField

from FarpostBackend.settings import MEDIA_PATH


class Interest(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class User(AbstractUser):
    '''Farpost user class, where username is telgram nickname'''
    profile_picture = models.ImageField(upload_to=MEDIA_PATH, null=True, blank=True)
    bio = models.CharField(max_length=300, default='Всем привет!')
    interests = models.ManyToManyField(Interest, blank=True)
    city = models.ForeignKey(City, on_delete=models.PROTECT, null=True, blank=True)
    
