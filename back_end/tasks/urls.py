from django.urls import include, path
from .views import *
urlpatterns = [
    path('create/', Create.as_view()),
    path('list/', List.as_view()),
    path('update/<int:pk>/', Update.as_view()),
    path('delete/<int:pk>/', Delete.as_view()),
    path('reorder/', Reorder.as_view())
]
