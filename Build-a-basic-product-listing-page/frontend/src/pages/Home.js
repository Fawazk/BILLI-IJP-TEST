import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import ProductForm from '../components/ProductForm';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ search_name: '', min_price: '', max_price: '', min_rating: '', max_rating: '', sort_by: '' });
  const [editData, setEditData] = useState(null);

  const loadProducts = async () => {
    const res = await fetchProducts(filters);
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    if (editData) {
      await updateProduct(editData.id, data);
      setEditData(null);
    } else {
      await createProduct(data);
    }
    loadProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Product Manager</Typography>
      <ProductForm onSubmit={handleCreateOrUpdate} initialData={editData} />
      <SearchFilter filters={filters} setFilters={setFilters} onSearch={loadProducts} />
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onEdit={setEditData} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;