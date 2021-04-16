from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate, login as dj_login, logout as dj_logout
from rest_framework.decorators import api_view
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Create your views here.


def authenticate_and_login(request, username, password):
    """takes request username and password and logs user in if has correct credentials"""
    user = authenticate(request, username=username, password=password)
    if user:
        dj_login(request, user)
        return True
    return False


@api_view(('POST',))
def UserCreate(request):
    username = request.data.get('username')
    password = request.data.get('password')
    data = {'username': username,
            'password1': password,
            'password2': password,
            }
    form = UserCreationForm(data)
    if form.is_valid():
        form.save()
        authenticate_and_login(request, username, password)
        return Response(data={"success": True}, status=status.HTTP_201_CREATED)
    else:
        return Response(data=form.errors.as_json())


@api_view(('POST',))
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    data = {'username': username,
            'password': password,
            }
    form = AuthenticationForm(data=data)
    if form.is_valid():
        authenticate_and_login(request, username, password)
        return Response(data={"success": True}, status=status.HTTP_200_OK)
    else:
        return Response(data=form.errors.as_json())


@api_view(('POST',))
def logout(request):
    dj_logout(request)
    return Response(status=status.HTTP_200_OK)


@ api_view(('GET',))
def UserLoggedIn(request):
    if request.user.is_authenticated:
        logged_in = True
    else:
        logged_in = False
    data = {"logged_in": logged_in, 'username': request.user.username}
    return Response(data)
