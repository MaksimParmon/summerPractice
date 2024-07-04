from django.contrib import admin

from products.models import Product, ProductCategory, Basket

admin.site.register(ProductCategory)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')
    fields = ('name', 'description', 'price', 'image', 'category')
    search_fields = ('name', )
    ordering = ('name', )


class BasketAdmin(admin.TabularInline):
    model = Basket
    fields = ('product', )
    extra = 0
