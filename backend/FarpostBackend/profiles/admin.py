from django.contrib import admin
from django.db.models import AutoField

from profiles.models import UserProfile, Interests


admin.site.register(UserProfile)
admin.site.register(Interests)

