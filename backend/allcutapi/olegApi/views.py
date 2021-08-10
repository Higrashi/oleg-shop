from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.contrib.auth import authenticate
from olegApi.models import Image, Orders, Customers, Product, Category, Message
from olegApi.serializers import ImageSerializer, OrdersSerializer, CustomersSerializer, ProductSerializer, CategorySerializer, MessageSerializer
from rest_framework.decorators import api_view

from olegApi.utils import sendBotMessage, sendQuestionMessage
# Create your views here.

@api_view(['GET','POST'])
def getOrders(request):
    if request.method == 'GET':
        orders = Orders.objects.all()
        orders_serializer = OrdersSerializer(orders, many=True)
        return JsonResponse(orders_serializer.data, safe=False)
    elif request.method == 'POST':
        order_data = JSONParser().parse(request)
        try:
            customer = Customers.objects.get(phone=order_data['phone'])
            if customer:
                order_data['customer'] = customer.id
                order_serializer = OrdersSerializer(data=order_data)
                if order_serializer.is_valid():
                    sendBotMessage(order_data)
                    order_serializer.save()
                    return JsonResponse(order_serializer.data,status=status.HTTP_201_CREATED)    
                else:
                    return JsonResponse(order_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            new_customer = {}
            new_customer['name'] = order_data['name']
            new_customer['email'] = order_data['email']
            new_customer['phone'] = order_data['phone']
            new_customer['crazy'] = False

            customer_serializer = CustomersSerializer(data=new_customer)
            if customer_serializer.is_valid():
                customer_serializer.save()
                order_data['customer'] = customer_serializer.data['id']
                order_serializer = OrdersSerializer(data=order_data)
                if order_serializer.is_valid():
                    sendBotMessage(order_data)
                    order_serializer.save()
                    return JsonResponse(order_serializer.data,status=status.HTTP_201_CREATED)    
                return JsonResponse(order_serializer.data,status.HTTP_201_CREATED)
        

@api_view(['GET', 'DELETE'])
def getOrderDetials(request, pk):
    order = Orders.objects.get(pk=pk)
    if request.method == 'GET':
        order_serializer = OrdersSerializer(order)
        return JsonResponse(order_serializer.data)
    elif request.method == 'DELETE':
        order.delete()
        return JsonResponse({'message': 'Order was deleted!'})    

@api_view(['GET', 'DELETE'])
def getCustomerOrders(request, id):
    if request.method == 'GET':
        orders = Orders.objects.filter(customer__id=id)
        order_serializer = OrdersSerializer(orders, many=True)
        return JsonResponse(order_serializer.data, safe=False)

@api_view(['GET', 'POST'])
def getCustomers(request):
    if request.method == 'GET':
        customers = Customers.objects.all()
        customers_serializer = CustomersSerializer(customers, many=True)
        return JsonResponse(customers_serializer.data, safe=False)
    elif request.method == 'POST':
        customer_data = JSONParser().parse(request)
        customer_serializer = CustomersSerializer(data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse(customer_serializer.data,status.HTTP_201_CREATED)
        return JsonResponse(customer_data.data, status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT'])
def getCustomer(request, id):
    if request.method == 'GET':
        
        try:
          customer = Customers.objects.get(id=id)  
          customer_serializer = CustomersSerializer(customer)
          return JsonResponse(customer_serializer.data)
        except:
          return JsonResponse(False, safe=False)
    if request.method == 'PUT':
        customer = Customers.objects.get(id=id)  
        customer_data = JSONParser().parse(request)
        customer_serializer = CustomersSerializer(customer,data=customer_data)
        if customer_serializer.is_valid():
            customer_serializer.save()
            return JsonResponse('All good', safe=False)    

@api_view(['GET','POST'])
def getProducts(request):
    if request.method == 'GET':
          try:
              products = Product.objects.all()
              products_serializer = ProductSerializer(products,many=True)
              return JsonResponse(products_serializer.data,safe=False)
          except:
             return JsonResponse(False, safe=False)
    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        product = {}
        product['name'] = product_data['name']
        product['description'] = product_data['description']
        product['price'] = product_data['price']
        product['category'] = product_data['category']
        product['main_image'] = product_data['main_image'][0]     
        product_serializer = ProductSerializer(data=product)
        if product_serializer.is_valid():
            product_serializer.save()
            if len(product_data['main_image']) > 1:
                for img in product_data['main_image']:
                    new_img = {}
                    new_img['name'] = img
                    new_img['product'] = product_serializer.data['id']
                    image_serializer = ImageSerializer(data=new_img)
                    if image_serializer.is_valid():
                        image_serializer.save()
                return JsonResponse('Saved', safe=False)    
            return JsonResponse('All Good',safe=False)
            
        return JsonResponse('Some error', status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE','PUT'])
def getProduct(request,id):
    product = Product.objects.get(id=id)
    if request.method == 'GET':
        product_serializer = ProductSerializer(product)
        return JsonResponse(product_serializer.data)
    if request.method == 'DELETE':
        product.delete()
        return JsonResponse('Deleted',safe=False)
    if request.method == 'PUT':
        product_data = JSONParser().parse(request)
        if not(product_data['main_image']):
            product_data['main_image'] = product.main_image
        product_serializer = ProductSerializer(product,data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse('All good', safe=False)    
           
    
@api_view(['GET','POST','DELETE'])
def getImages(request):
    if request.method == 'GET':
        images = Image.objects.all()
        images_Serializer = ImageSerializer(images, many=True)
        return JsonResponse(images_Serializer.data,safe=False)
    if request.method == "POST":
        image_data = JSONParser().parse(request)
        image_serializer = ImageSerializer(data=image_data)
        if image_serializer.is_valid():
            image_serializer.save()
            JsonResponse('Saved', safe=False)
        

@api_view(['GET','POST','DELETE'])
def getImage(request, id):
    if request.method == 'GET':
        image = Image.objects.filter(product=id)
        images_Serializer = ImageSerializer(image,many=True)
        return JsonResponse(images_Serializer.data,safe=False)
    if request.method == "DELETE":
        image = Image.objects.get(id=id)
        image.delete()
        return JsonResponse("deleted",safe=False)

@api_view(['POST'])       
def checkUser(request):
   
  user_data = JSONParser().parse(request)
  user = authenticate(username=user_data['name'],password=user_data['password'])
  
  if user is not None:
      return JsonResponse('User is valid',safe=False)
  else:
      return JsonResponse('Wrong data', status.HTTP_401_UNAUTHORIZED, safe=False)

@api_view(['POST'])
def findUser(request):
    customer_data = JSONParser().parse(request)
    customer = Customers.objects.get(phone=customer_data['query'])
    customer_serializer = CustomersSerializer(customer)
    return JsonResponse(customer_serializer.data,safe=False)

@api_view(['GET','POST','DELETE'])    
def getCategories(request):
    
    if request.method == 'GET':
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories,many=True)
        return JsonResponse(categories_serializer.data,safe=False)
    if request.method == 'POST':
        category_data = JSONParser().parse(request)
        try:
            existing_cat = Category.objects.get(name=category_data['name'])
            if existing_cat:
                return JsonResponse('Existed',safe=False)
        except:
            category_serializer = CategorySerializer(data=category_data)
            if category_serializer.is_valid():
                category_serializer.save()
                return JsonResponse('Created',safe=False)
            return JsonResponse(status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])        
def getCategory(request,id):
    if request.method == 'DELETE':
        category = Category.objects.get(id=id)
        category.delete()
        return JsonResponse("deleted", safe=False)


@api_view(['POST'])
def filterProductsByCategory(request):
    request_data = JSONParser().parse(request)
    products = Product.objects.filter(category=request_data['name'])
    products_serializer = ProductSerializer(products,many=True)
    return JsonResponse(products_serializer.data,safe=False)

@api_view(['GET','POST'])    
def getMessages(request):
    if request.method == 'GET':
        messages = Message.objects.all()
        messages_serializer = MessageSerializer(messages,many=True)
        return JsonResponse(messages_serializer.data,safe=False)
    if request.method == 'POST':
        message = JSONParser().parse(request)
        message_serializer = MessageSerializer(data=message)
        if message_serializer.is_valid():
            sendQuestionMessage(message)
            message_serializer.save()
            return JsonResponse('Ok', safe=False)
            
@api_view(['GET'])
def getMessageDetails(request,id):
    if request.method == 'GET':
        message = Message.objects.get(id=id)
        message_serializer = MessageSerializer(message)
        return JsonResponse(message_serializer.data)
            