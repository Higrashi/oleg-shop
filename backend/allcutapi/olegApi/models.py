from django.db import models
from django.db.models.deletion import CASCADE


# Create your models here.


class Customers(models.Model):
    name = models.CharField(max_length=250,blank=False,default='')
    email = models.CharField(max_length=250,blank=True,default='')
    phone = models.CharField(max_length=250,blank=False,default='')
    crazy = models.BooleanField(blank=True, default=False)
    commentary = models.TextField(blank=True,default='')  

class Orders(models.Model):
    address = models.CharField(max_length=250, blank=True, default='')
    date = models.CharField(max_length=50,blank=False)
    email = models.CharField(max_length=50, blank=False, default='')
    name = models.CharField(max_length=50, blank=False, default='')
    phone = models.CharField(max_length=50, blank=False, default='')
    payment = models.CharField(max_length=50, blank=True, default='')
    commentary = models.TextField(blank=True,default='')
    products = models.TextField(blank=True, default='')
    total_price = models.IntegerField(blank=True,default=0)
    customer = models.ForeignKey(Customers, on_delete=CASCADE, null=True)

  
class Product(models.Model):
    name = models.CharField(max_length=250,blank=False,default='')
    description = models.TextField(blank=False,default='')
    price = models.IntegerField(blank=False,default=0)
    category = models.CharField(max_length=250,blank=True,default='')
    main_image = models.CharField(max_length=250,blank=True,default='')
   

class Image(models.Model):
    name = models.CharField(max_length=250,blank=False,default='')
    product = models.ForeignKey(Product,on_delete=CASCADE,null=True)


class Message(models.Model):
    name = models.CharField(max_length=250,blank=False,default='')
    email = models.CharField(max_length=250,blank=True,default='')
    phone = models.CharField(max_length=250,blank=False,default='')
    message = models.TextField(blank=False, default='')
    date = models.CharField(max_length=250,blank=False,default='')

class Category(models.Model):
    name = models.CharField(max_length=250,blank=False,default='')
    