# Generated by Django 5.1.4 on 2024-12-16 01:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
        ('books', '0003_delete_favoritegenre'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='favorite_genre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='books.bookgenre'),
        ),
    ]