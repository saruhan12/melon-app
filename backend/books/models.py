from django.db import models
from django.conf import settings



class BookGenre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    release_date = models.DateField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    photo_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name
    

class BookGenreRelation(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='genres'
    )
    genre = models.ForeignKey(
        BookGenre,
        on_delete=models.CASCADE,
        related_name='books'
    )

    class Meta:
        unique_together = ('book', 'genre')  # Birleşik benzersiz anahtar
        verbose_name = 'Book Genre Relation'
        verbose_name_plural = 'Book Genre Relations'

    def __str__(self):
        return f"{self.book.name} - {self.genre.name}"



class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )
    book = models.ForeignKey(
        Book, 
        on_delete=models.CASCADE, 
        related_name='reviews'
    )
    date = models.DateField()
    content = models.TextField()
    stars = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('user', 'book')  # Birleşik benzersiz anahtar (Primary Key gibi)

def __str__(self):
        return f"{self.user}'s comment is: {self.content}"


class FavoriteBook(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='favorite_books'
    )
    book = models.ForeignKey(
        Book, 
        on_delete=models.CASCADE, 
        related_name='favorited_by'
    )
    
    def __str__(self):
        return f"{self.user}'s favorite: {self.book}"

    class Meta:
        unique_together = ('user', 'book')




