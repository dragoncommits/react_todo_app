from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    completedTime = models.DateTimeField(null=True, blank=True)
    order = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.content

    class meta:
        ordering = ['user', 'order']
