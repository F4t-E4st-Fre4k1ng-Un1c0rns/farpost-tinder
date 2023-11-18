from django.db import models

from profiles.models import User


class Metch(models.Model):
    default_state = 'PENDING'
    states_choices = (
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('Declined', 'Pending'),
    )
    
    author = models.ForeignKey(User, related_name="author_user", on_delete=models.CASCADE)
    recipient = models.ForeignKey(User,related_name="recipient_user", on_delete=models.CASCADE)
    message = models.CharField(max_length = 300)
    state = models.CharField(max_length=100, choices=states_choices, default=default_state)

    def __str__(self):
        return f"{self.author} -> {self.recipient}"
