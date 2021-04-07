from django.urls import include, path
from .views import *
urlpatterns = [
    path("new/", UserCreate),
    path("loggedIn/", UserLoggedIn),
    path('login/', login),
    path('logout/', logout),
]
