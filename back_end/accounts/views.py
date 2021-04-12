from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate, login as dj_login, logout as dj_logout
from rest_framework.decorators import api_view
from django.contrib.auth.forms import UserCreationForm

# Create your views here.


@api_view(('POST',))
def UserCreate(request):
    data = {'username': request.data.get('username'),
            'password1': request.data.get('password'),
            'password2': request.data.get('password'),
            }
    form = UserCreationForm(data)
    if form.is_valid():
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(data=form.errors.as_json())


"""
@api_view(('POST',))
def UserCreate(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        data = {'error': f"someone with the username '{username}' already exists"}
        return Response(data)
    user = UserSerializer().create(
        {'username': username, 'password': password})
    print(user)
    user = authenticate(request, username=username, password=password)
    if user:
        dj_login(request, user)
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_409_CONFLICT)
"""


@api_view(('POST',))
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user:
        # A backend authenticated the credentials
        dj_login(request, user)

        return Response(status=status.HTTP_200_OK)
    return Response({'error': "wrong username or password"})


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
