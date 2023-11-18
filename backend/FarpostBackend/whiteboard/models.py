from django.db import models

from profiles.models import User


class Advert(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    x_coordinates = models.IntegerField()
    y_coordinates = models.IntegerField()
    title = models.CharField(max_length=100)
    text = models.TextField()

    def __str__(self):
        return f"{self.author}: {self.title}"

