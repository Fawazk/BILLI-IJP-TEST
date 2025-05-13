# products/urls.py
from django.urls import path
from .views import ProductListCreateView, ProductUpdateDeleteView

urlpatterns = [
    path('api/products/', ProductListCreateView.as_view(), name='product-list-create'),  # for GET (list), POST (create)
    path('api/products/<int:pk>/', ProductUpdateDeleteView.as_view(), name='product-update-delete'),  # for PUT (update), DELETE (delete)
]
