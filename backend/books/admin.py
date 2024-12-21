from django.contrib import admin
from .models import BookGenre, Author, Book, BookGenreRelation, Review, FavoriteBook

admin.site.register(BookGenre)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(BookGenreRelation)
admin.site.register(Review)
admin.site.register(FavoriteBook)
