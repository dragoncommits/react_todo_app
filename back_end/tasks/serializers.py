from django.contrib.auth.models import User
from .models import Task
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Task
        fields = ['created', 'content', 'completed',
                  "user", 'id', 'completedTime', 'order']
        extra_kwargs = {
            'order': {'write_only': True}
        }
