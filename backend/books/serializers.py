from rest_framework import serializers
from .models import BookGenre, Author, Book, BookGenreRelation, Review, FavoriteBook
from django.conf import settings
from django.contrib.auth import get_user_model
from base.serializers import UserSerializer


# BookGenre Serializer
class BookGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookGenre
        fields = [ 'name']  # Tüm alanları serileştirme


# Author Serializer
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = [ 'first_name', 'last_name']



class BookGenreRelationSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()  # Kitap adını döner
    genre = serializers.StringRelatedField()  # Tür adını döner

    class Meta:
        model = BookGenreRelation
        fields = ['book', 'genre']

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    book = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ['user', 'book', 'date', 'content', 'stars']
# FavoriteBook Serializer
class PersonalFavoriteBookSerializer(serializers.ModelSerializer):
    book =serializers.StringRelatedField()

    class Meta:
        model = FavoriteBook
        fields = ['book']

class BookDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)  # Yazar detaylarını ekle
    genres = BookGenreRelationSerializer(many=True, read_only=True)
    #reviews = ReviewSerializer(many=True, read_only=True)  # Yorumları doğrudan ekle

    class Meta:
        model = Book
        fields = [ 'name', 'release_date', 'author', 'genres',  'photo_url']#,'reviews'

    def __str__(self):
        return self.name
    

class BookCommentsSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)  # Yorumları doğrudan ekle

    class Meta:
        model = Book
        fields = ['reviews']

    def __str__(self):
        return self.name
##############################################################################3


class BookSearchPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = [ 'id','name', 'photo_url']#,'reviews'

    def __str__(self):
        return self.name