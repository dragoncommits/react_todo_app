from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate, login as dj_login, logout as dj_logout
from rest_framework.decorators import api_view

# Create your views here.


def mainView(request):
    return render(request, "build\index.html")
