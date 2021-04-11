from django.contrib import admin
from .models import Task

# Register your models here.


class TaskAdmin(admin.ModelAdmin):
    list_display = ('content', 'created', "completed",
                    "user", 'completedTime', 'order')

    search_fields = ['content', 'user']
    list_filter = ('completed', 'created', 'completedTime', 'order')

    fields = ('content', ('completed',
              'completedTime'), ('user', 'order'))

    readonly_fields = ('created',)


admin.site.register(Task, TaskAdmin)
