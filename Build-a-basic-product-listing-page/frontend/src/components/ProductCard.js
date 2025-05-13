import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onEdit, onDelete }) => (
  <Card sx={{ margin: 1 }}>
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating} / 5</Typography>
      <Typography>Description: {product.description}</Typography>
      <IconButton onClick={() => onEdit(product)}><EditIcon /></IconButton>
      <IconButton onClick={() => onDelete(product.id)}><DeleteIcon /></IconButton>
    </CardContent>
  </Card>
);

export default ProductCard;