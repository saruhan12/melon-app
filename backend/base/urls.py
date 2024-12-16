from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_todos,  CustomTokenObtainPairView,CustomTokenRefreshView,logout,register,is_logged_in, BookViewSet, GenreViewSet


# Initialize the DefaultRouter
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')  # API for books
router.register(r'genres', GenreViewSet, basename='genre')  # API for genres

# Define the urlpatterns
urlpatterns = [
    # Authentication routes
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout, name='logout'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('authenticated/', is_logged_in, name='is_logged_in'),

    # Additional routes (if applicable)
    path('todos/', get_todos, name='get_todos'),

    # API routes (served under /api/)
    path('api/', include(router.urls)),  # Include API routes from the router
]
