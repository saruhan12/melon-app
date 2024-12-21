from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import BookGenre, Author, Book, BookGenreRelation, Review, FavoriteBook
from datetime import date

User = get_user_model()

class BookGenreTestCase(TestCase):
    def setUp(self):
        self.genre = BookGenre.objects.create(name="Fiction")

    def test_create_genre(self):
        self.assertEqual(self.genre.name, "Fiction")

    def test_unique_genre(self):
        with self.assertRaises(Exception):
            BookGenre.objects.create(name="Fiction")

class AuthorTestCase(TestCase):
    def setUp(self):
        self.author = Author.objects.create(first_name="John", last_name="Doe")

    def test_create_author(self):
        self.assertEqual(str(self.author), "John Doe")

class BookTestCase(TestCase):
    def setUp(self):
        self.author = Author.objects.create(first_name="Jane", last_name="Austen")
        self.book = Book.objects.create(
            name="Pride and Prejudice",
            release_date=date(1813, 1, 28),
            author=self.author,
            photo_url="https://example.com/image.jpg"
        )

    def test_create_book(self):
        self.assertEqual(self.book.name, "Pride and Prejudice")
        self.assertEqual(self.book.author, self.author)

    def test_str_book(self):
        self.assertEqual(str(self.book), "Pride and Prejudice")

class BookGenreRelationTestCase(TestCase):
    def setUp(self):
        self.genre = BookGenre.objects.create(name="Romance")
        self.author = Author.objects.create(first_name="Jane", last_name="Austen")
        self.book = Book.objects.create(
            name="Sense and Sensibility",
            release_date=date(1811, 10, 30),
            author=self.author
        )
        self.relation = BookGenreRelation.objects.create(book=self.book, genre=self.genre)

    def test_create_relation(self):
        self.assertEqual(self.relation.book, self.book)
        self.assertEqual(self.relation.genre, self.genre)

    def test_unique_relation(self):
        with self.assertRaises(Exception):
            BookGenreRelation.objects.create(book=self.book, genre=self.genre)

class ReviewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.author = Author.objects.create(first_name="Mark", last_name="Twain")
        self.book = Book.objects.create(
            name="The Adventures of Tom Sawyer",
            release_date=date(1876, 6, 1),
            author=self.author
        )
        self.review = Review.objects.create(
            user=self.user,
            book=self.book,
            date=date.today(),
            content="A classic novel.",
            stars=5
        )

    def test_create_review(self):
        self.assertEqual(self.review.stars, 5)
        self.assertEqual(self.review.content, "A classic novel.")

    def test_unique_review(self):
        with self.assertRaises(Exception):
            Review.objects.create(
                user=self.user, book=self.book, date=date.today(), content="Another review.", stars=4
            )

class FavoriteBookTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="favoriteuser", password="testpass")
        self.author = Author.objects.create(first_name="J.K.", last_name="Rowling")
        self.book = Book.objects.create(
            name="Harry Potter and the Philosopher's Stone",
            release_date=date(1997, 6, 26),
            author=self.author
        )
        self.favorite = FavoriteBook.objects.create(user=self.user, book=self.book)

    def test_create_favorite(self):
        self.assertEqual(str(self.favorite), f"{self.user}'s favorite: {self.book}")

    def test_unique_favorite(self):
        with self.assertRaises(Exception):
            FavoriteBook.objects.create(user=self.user, book=self.book)
