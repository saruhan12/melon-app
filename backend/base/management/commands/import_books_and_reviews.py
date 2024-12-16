from django.core.management.base import BaseCommand
from base.models import Book, Genre, Review
import csv

class Command(BaseCommand):
    help = "Import books and reviews from CSV files"

    def handle(self, *args, **kwargs):
        # Import books
        with open('sonBooks.csv', encoding='utf-8') as books_file:
            books_reader = csv.DictReader(books_file)
            for row in books_reader:
                book, _ = Book.objects.get_or_create(
                    name=row['name'].strip(),
                    author=row['author'].strip() or "Unknown Author",
                    defaults={'cover_url': row.get('cover_url', '').strip()},
                )
                genres = row['genres'].split(',') if row['genres'] else []
                for genre_name in genres:
                    genre, _ = Genre.objects.get_or_create(name=genre_name.strip())
                    book.genres.add(genre)

        # Import reviews
        with open('sonRew.csv', encoding='utf-8') as reviews_file:
            reviews_reader = csv.DictReader(reviews_file)
            for row in reviews_reader:
                # Validate and clean book_id
                try:
                    book_id = int(float(row['book_id']))  # Convert to float first, then to int
                except ValueError:
                    self.stderr.write(f"Skipping invalid book_id: {row['book_id']}")
                    continue

                # Convert rating to int
                try:
                    rating = int(float(row['rating']))  # Handle float-like strings like '5.0'
                except ValueError:
                    self.stderr.write(f"Skipping invalid rating: {row['rating']}")
                    continue

                # Find the book
                book = Book.objects.filter(id=book_id).first()
                if book:
                    Review.objects.create(
                        book=book,
                        rating=rating,
                        text=row['text'] or "No text provided.",
                        external_user_id=row['profile_id'],
                        external_username=row['name'],
                    )

        self.stdout.write(self.style.SUCCESS('Books and reviews imported successfully!'))
