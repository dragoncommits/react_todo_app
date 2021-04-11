from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, login as dj_login, logout as dj_logout
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from . serializers import TaskSerializer
from .models import Task

# Create your views here.


def mainView(request):
    return render(request, "build\index.html")


class Create(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer


class List(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class Update(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Task.objects.get(user=self.request.user, pk=self.kwargs['pk'])


class Delete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Task.objects.get(user=self.request.user, pk=self.kwargs['pk'])


class DeleteCompleted(APIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        tasks = Task.objects.filter(user=request.user, completed=True)
        tasks.delete()
        return Response(status=status.HTTP_200_OK)


class Reorder(APIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = []
        for i, item in enumerate(request.data):

            task = Task.objects.get(pk=item['id'])
            serializer = TaskSerializer(
                task, data={'order': i}, partial=True)

            if serializer.is_valid():
                serializer.save()
                data.append(serializer.data)
            else:
                # return a meaningful error response
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(data)
