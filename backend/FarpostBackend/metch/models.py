from django.db import models

from profiles.models import UserProfile


class Metch(models.Model):
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    recipient = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f"{self.author} -> {self.recipient}"
