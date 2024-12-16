# Generated by Django 5.1.4 on 2024-12-16 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_genre_book_review"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="author",
            field=models.CharField(default="no_auth", max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="book",
            name="name",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterUniqueTogether(
            name="book",
            unique_together={("name", "author")},
        ),
    ]
