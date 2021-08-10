from django.conf.urls import url
from olegApi import views

urlpatterns = [
    url(r'^api/orders$',views.getOrders),
    url(r'^api/order-details/(?P<pk>[0-9]+)$', views.getOrderDetials),
    url(r'^api/customer-orders/(?P<id>[0-9]+)$', views.getCustomerOrders),
    url(r'^api/customers$', views.getCustomers),
    url(r'^api/customer/(?P<id>[0-9]+)$', views.getCustomer),
    url(r'^api/products$', views.getProducts),
    url(r'^api/product/(?P<id>[0-9]+)$', views.getProduct),
    url(r'^api/images$', views.getImages),
    url(r'^api/image/(?P<id>[0-9]+)$', views.getImage),
    url(r'^api/user$', views.checkUser),
    url(r'^api/find-user$', views.findUser),
    url(r'^api/categories$', views.getCategories),
    url(r'^api/category/(?P<id>[0-9]+)$', views.getCategory),
    url(r'^api/filter-products$', views.filterProductsByCategory),
    url(r'^api/messages$', views.getMessages),
    url(r'^api/message-details/(?P<id>[0-9]+)$', views.getMessageDetails),
]
