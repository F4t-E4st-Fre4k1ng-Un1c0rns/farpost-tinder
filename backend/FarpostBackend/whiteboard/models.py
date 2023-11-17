from django.db import models

from profiles.models import UserProfile


class Advert(models.Model):
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    x_coordinates = models.IntegerField()
    y_coordinates = models.IntegerField()
    title = models.CharField(max_length=100)
    text = models.TextField()

    def __str__(self):
        return f"{self.author}: {self.title}"

