from django.contrib import admin
from django.db.models import AutoField

from profiles.models import User, Interest


admin.site.register(User)
admin.site.register(Interest)

