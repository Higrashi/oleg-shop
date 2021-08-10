from rest_framework import serializers
from olegApi.models import Orders, Customers, Product, Image, Message, Category

class OrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Orders
        fields = (
            'id',
            'address',
            'date',
            'email',
            'name',
            'payment',
            'phone',
            'commentary',
            'products',
            'total_price',
            'customer'
        )

class CustomersSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customers
        fields = (
            'id',
            'name',
            'email',
            'phone',
            'crazy',
            'commentary'
        )

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'description',
            'price',
            'category',
            'main_image'
            
        )         

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = (
            'id',
            'name',
            'product'
        )

class MessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Message
        fields = (
            'id',
            'name',
            'email',
            'phone',
            'message',
            'date'
        )

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = (
            'id',
            'name'
        )