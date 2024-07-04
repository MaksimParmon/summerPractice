from django.db import models
from rest_framework import serializers
from .models import Product, ProductCategory, User, Basket
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


