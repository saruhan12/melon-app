from django.db import models
from django.contrib.auth.models import User,AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    """
    favorite_genre = models.ForeignKey(
        'books.BookGenre',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )
    """
    def __str__(self):
        return self.username

class Todo(models.Model):
    name = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todo')
    

