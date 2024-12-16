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
    
class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    cover_url = models.URLField(null=True, blank=True)
    genres = models.ManyToManyField('Genre', related_name='books')

    class Meta:
        unique_together = ('name', 'author')  # Add this line to enforce uniqueness


from django.conf import settings  # Import settings to access AUTH_USER_MODEL

# models.py
class Review(models.Model):
    book = models.ForeignKey('Book', related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    text = models.TextField()
    external_user_id = models.CharField(max_length=255, blank=True, null=True)  # For external user IDs
    external_username = models.CharField(max_length=255, blank=True, null=True)  # For external usernames
    

    def __str__(self):
        return f"{self.book.name} - {self.rating} stars"


