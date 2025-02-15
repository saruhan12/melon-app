from django.urls import path, include
from .views import get_todos, CustomTokenObtainPairView, CustomTokenRefreshView,CustomUserViewSet, logout, register, is_logged_in
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'profile', CustomUserViewSet, basename='profile')

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('todos/', get_todos),
    path('register/', register),
    path('authenticated/', is_logged_in),
    path('books/', include("books.urls")),
    *router.urls,
]