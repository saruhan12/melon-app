from django.db import models
from django.contrib.auth.models import User,AbstractUser
from django.conf import settings
from rest_framework import viewsets, permissions


class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    
    favorite_genre = models.ForeignKey(
        'books.BookGenre',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )
    
    #first_name = models.CharField(max_length=100)
    #last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.username}"


class Todo(models.Model):
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todo')
    

