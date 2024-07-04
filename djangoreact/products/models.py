from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class ProductCategory(models.Model):
    name = models.CharField(max_length=32, unique=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='products_images')
    category = models.ForeignKey(to=ProductCategory, related_name='products', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def __str__(self):
        return f'Продукт: {self.name} | Категория: {self.category.name}'


class User(AbstractUser):
    image = models.ImageField(upload_to='users_images', null=True, blank=True)


class BasketQuerySet(models.QuerySet):
    def total_sum(self):
        return sum(basket.sum() for basket in self)

    def total_quantity(self):
        return sum(1 for basket in self)


class Basket(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    created_timestamp = models.DateTimeField(auto_now_add=True)

    objects = BasketQuerySet.as_manager()

    def __str__(self):
        return f'Корзина для {self.user.email} | Продукт {self.product.name}'

    def sum(self):
        return self.product.price