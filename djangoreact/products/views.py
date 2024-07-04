from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from rest_framework import status

from .models import Product, ProductCategory, User, Basket
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import ProductSerializer, CategorySerializer, UserSerializer, UserSerializerWithToken, BasketSerializer
# Create your views here.


@api_view(['GET'])
def getProducts(request, category):
    if category != 'undefined':
        category = ProductCategory.objects.get(name=category)
        products = Product.objects.filter(category=category)
    else:
        products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    categories = ProductCategory.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBasket(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    basket = Basket.objects.filter(user=user).select_related('product')
    data = []
    for item in basket:
        data.append({
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'price': item.product.price,
                'description': item.product.description,
            },
        })
    total_sum = basket.total_sum()
    response_data = {
        'basket_items': data,
        'total_sum': total_sum
    }

    return Response(response_data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def getBasket(request, pk):
#     user = User.objects.get(id=pk)
#     basket = Basket.objects.select_related('product', 'user')
#     basket = basket.filter(user=user)
#     data = []
#     for item in basket:
#         data.append({
#             'id': item.id,
#             'product': {
#                 'id': item.product.id,
#                 'name': item.product.name,
#                 'price': item.product.price,
#                 'description': item.product.description,
#             },
#         })
#     # data.append(basket.total_sum())
#
#     # serializer = BasketSerializer(basket, many=True)
#     return Response(data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUserProfiles(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['DELETE'])
def removeFromBasket(request, pk):
    try:
        basket_item = Basket.objects.get(id=pk)
        basket_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Basket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def add_to_basket(request):
    data = request.data
    user = User.objects.get(id=data['user'])
    product = Product.objects.get(id=data['product'])
    baskets = Basket.objects.filter(user=user, product=product)
    if not baskets.exists():
        basket_item = Basket.objects.create(user=user, product=product)
    else:
        basket_item = baskets.first()
        basket_item.save()
    serializer = BasketSerializer(basket_item, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    try:

        user=User.objects.create(
            first_name=data['firstname'],
            last_name=data['lastname'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'USER WITH THIS EMAIL ALREADY EXIST'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)