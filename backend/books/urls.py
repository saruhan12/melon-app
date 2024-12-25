from rest_framework.routers import DefaultRouter
from .views import BookDetailViewSet,BookCommentsViewSet, PersonalReviewViewSet, FavoriteBookViewSet, UserProfileFavoriteBookViewSet
from .views import RandomBooksByGenreViewSet

router = DefaultRouter()
router.register(r'books', BookDetailViewSet, basename='book')
router.register(r'reviews-of-book', BookCommentsViewSet, basename='reviews-of-book')
router.register(r'personal-reviews', PersonalReviewViewSet, basename='personal-reviews')
router.register(r'favorite-books', FavoriteBookViewSet, basename='favorite-book')
router.register(r'profile-favorite-books', UserProfileFavoriteBookViewSet, basename='profile-favorite-books')
router.register(r'random-search-books', RandomBooksByGenreViewSet, basename='random-search-books')

#router.register(r'profile-favorite-genres', UserProfileFavoriteGenreViewSet, basename='profile-favorite-genres')


urlpatterns = [
    *router.urls,
]
