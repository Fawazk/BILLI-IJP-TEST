import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', price: '', rating: '' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "rating" ? parseFloat(value) : value,
        }));
        };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', price: '', rating: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} marginBottom={4}>
      <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
      <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            />
      <TextField label="Rating" name="rating" type="number" value={formData.rating} onChange={handleChange} required />
      <Button type="submit" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
    </Box>
  );
};

export default ProductForm;