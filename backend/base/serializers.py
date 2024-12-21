from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Todo,CustomUser
from rest_framework import viewsets, permissions



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'name', 'completed']

class CustomUserSerializer(serializers.ModelSerializer):
    from books.serializers import BookGenreSerializer,BookGenre

    """
    Kullanıcı modeli için serializer.
    """
    favorite_genre = BookGenreSerializer(read_only=True)  # Nested serializer kullanımı

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'favorite_genre']
        read_only_fields = ['id', 'username']

    def update(self, instance, validated_data):
        """
        Kullanıcının favori türünü güncellemek için update metodunu override ediyoruz.
        """
        favorite_genre = validated_data.pop('favorite_genre', None)
        if favorite_genre:
            instance.favorite_genre = favorite_genre
        instance.save()
        return instance
    

