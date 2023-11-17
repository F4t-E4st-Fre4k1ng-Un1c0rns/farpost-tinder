from django.db import models
from django.contrib.auth.models import User


class Interests(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


#username is telegram nickname
class UserProfile(User):
    bio = models.CharField(max_length=300)
    interests = models.ManyToManyField(Interests)
    
