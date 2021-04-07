from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
