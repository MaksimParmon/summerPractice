from django.urls import path
from products import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,

)

urlpatterns = [
    # path('', views.getRoutes, name="getRoutes"),
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('categories/', views.getCategories, name="getCategories"),
    path('products/', views.getProducts, name="getProducts"),
    path('products/<str:category>', views.getProducts, name="getProductsByCategory"),
    path('users/profile/<str:pk>', views.getUserProfiles, name="getUserProfiles"),
    path('product/<str:pk>', views.getProduct, name="getProduct"),
    path('basket/', views.add_to_basket, name="addToBasket"),
    path('basket/<str:pk>', views.getBasket, name="getBasket"),
    path('basket/delete/<str:pk>', views.removeFromBasket, name="removeBasket"),
]