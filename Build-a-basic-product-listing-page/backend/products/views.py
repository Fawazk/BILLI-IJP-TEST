# products/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer

class ProductListCreateView(APIView):
    
    def get(self, request):
        # Start with the base query to fetch all products
        products = Product.objects.all()

        # Search by product name
        search_name = request.query_params.get('search_name', None)
        if search_name:
            products = products.filter(Q(name__icontains=search_name))  # Using Q object for case-insensitive search

        # Filter by price and rating
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        min_rating = request.query_params.get('min_rating', None)
        max_rating = request.query_params.get('max_rating', None)

        if min_price:
            products = products.filter(price__gte=min_price)  # Filter by minimum price
        if max_price:
            products = products.filter(price__lte=max_price)  # Filter by maximum price
        if min_rating:
            products = products.filter(rating__gte=min_rating)  # Filter by minimum rating
        if max_rating:
            products = products.filter(rating__lte=max_rating)  # Filter by maximum rating

        # Sorting by name or price
        sort_by = request.query_params.get('sort_by', None)
        if sort_by == 'name':
            products = products.order_by('name')  # Sort by name (ascending)
        elif sort_by == 'price':
            products = products.order_by('price')  # Sort by price (ascending)

        # Serializing the products data
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Create a new product
        print(request.data)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# products/views.py
class ProductUpdateDeleteView(APIView):

    def put(self, request, pk):
        # Update an existing product
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        # Delete a product
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        
        product.delete()
        return Response({"detail": "Product deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
