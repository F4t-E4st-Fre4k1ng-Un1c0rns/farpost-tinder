from django.db import models

from profiles.models import User


class Metch(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    state = models.TextField() # accepted/declined/waited

    def __str__(self):
        return f"{self.author} -> {self.recipient}"
