from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Book, Review, FavoriteBook, Author,BookGenreRelation,BookGenre
from .serializers import (
    BookDetailSerializer,
    ReviewSerializer,
    PersonalFavoriteBookSerializer,
    AuthorSerializer,
    BookCommentsSerializer,
    BookSearchPageSerializer,
)

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from .models import Book, Review
from .serializers import BookDetailSerializer, ReviewSerializer, AuthorSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from django.shortcuts import get_object_or_404

import logging
logger = logging.getLogger(__name__)
import sys


class BookDetailViewSet(viewsets.ModelViewSet):
    """
    Kullanıcı kitapları listeleyebilir, detaylarını görüntüleyebilir.
    """
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["get"])
    def author(self, request, pk=None):
        """
        Bir kitabın yazarını döndüren özel endpoint.
        """
        book = self.get_object()
        author = book.author
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def genres(self, request, pk=None):
        """
        Bir kitaba ait türleri listelemek için özel bir endpoint.
        """
        book = self.get_object()
        all_genres=BookGenreRelation.objects.filter()
        this_book_genres=all_genres.filter(book=book)
        logger.debug(this_book_genres)
        print("hello")
        sys.stdout.write("Bu bir test mesajıdır.\n")
        serializer = ReviewSerializer(this_book_genres, many=True)
        return Response(serializer)


    @action(detail=False, methods=["get"])
    def get_by_name(self, request):
        """
        Kitap ismine göre kitap detaylarını dönen özel bir endpoint.
        Query parametresi: ?name=<kitap_ismi>
        """
        book_name = request.query_params.get('name')
        if not book_name:
            return Response({"error": "Kitap ismi belirtilmedi."}, status=400)

        book = get_object_or_404(Book, name=book_name)
        serializer = self.get_serializer(book)
        return Response(serializer.data)
    

class BookCommentsViewSet(viewsets.ModelViewSet):
    """
    Kullanıcı kitapları listeleyebilir, detaylarını görüntüleyebilir.
    """
    queryset = Book.objects.all()
    serializer_class = BookCommentsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["get"])
    def reviews(self, request, pk=None):
        
        """
        Bir kitaba ait yorumları listelemek için özel bir endpoint.
        """
        book = self.get_object()  # İlgili kitabı al
        all_reviews = Review.objects.filter()
        reviews = all_reviews.filter(book=book)  # Kitaba ait yorumları filtrele
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"])
    def get_by_name(self, request):
        """
        Kitap ismine göre yorumları dönen özel bir endpoint.
        Query parametresi: ?name=<kitap_ismi>
        """
        book_name = request.query_params.get('name')  # Kitap adını al
        if not book_name:
            return Response({"error": "Kitap ismi belirtilmedi."}, status=400)

        # Kitabı isme göre al
        book = get_object_or_404(Book, name=book_name)

        # Kitaba ait yorumları al
        reviews = Review.objects.filter(book=book)
        if not reviews.exists():
            return Response({"message": "Bu kitaba ait yorum bulunamadı."}, status=404)

        # Yorumları serialize et ve döndür
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


# Kullanıcı Yorumları için ViewSet
class PersonalReviewViewSet(viewsets.ModelViewSet):
    """
    Kullanıcı kitaplara yorum yapabilir, yorumlarını düzenleyebilir.
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Kullanıcı yalnızca kendi yorumlarını görebilir.
        """
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Yorum oluşturulurken kullanıcıyı otomatik ata.
        """
        serializer.save(user=self.request.user)

# Favori Kitaplar için ViewSet
class FavoriteBookViewSet(viewsets.ModelViewSet):
    """
    Kullanıcı favori kitaplarını ekleyebilir ve görüntüleyebilir.
    """
    serializer_class = PersonalFavoriteBookSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Kullanıcının sadece kendi favori kitaplarını listele.
        """
        return FavoriteBook.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Favori kitap eklerken kullanıcıyı otomatik ata.
        """
        serializer.save(user=self.request.user)

# Kullanıcı Profiline Özel Kitaplar
class UserProfileFavoriteBookViewSet(viewsets.ViewSet):
    """
    Kullanıcının en çok sevdiği kitapları ve detaylarını listelemek için özel ViewSet.
    """
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        """
        Kullanıcının en çok favorilediği kitapları listele.
        """
        user_favorites = FavoriteBook.objects.filter(user=request.user)
        books = [favorite.book for favorite in user_favorites]
        serializer = BookDetailSerializer(books, many=True)
        return Response(serializer.data)




class RandomBooksByGenreViewSet(viewsets.ViewSet):
    """
    Her bir 'genre' için rastgele 20 kitap döndürür.
    """

    def list(self, request):
        genres = BookGenre.objects.all()  # Tüm türleri al
        result = []

        for genre in genres:
            books = Book.objects.filter(genres__genre=genre).order_by('?')[:20]  # Rastgele 20 kitap al
            serialized_books = BookSearchPageSerializer(books, many=True).data
            result.append({
                'genre': genre.name,
                'books': serialized_books
            })

        return Response(result)