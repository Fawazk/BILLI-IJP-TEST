import React, { useState, useEffect } from 'react';
import API from '../api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function BlogForm({ postId, onSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isEdit = Boolean(postId);

  useEffect(() => {
  if (isEdit) {
    API.get(`posts/${postId}/`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
        });
    }
    }, [postId, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, content };

    const request = isEdit
      ? API.put(`posts/${postId}/`, data)
      : API.post('posts/', data);

    request.then(() => {
      setTitle('');
      setContent('');
      if (onSuccess) onSuccess(); // refresh list or redirect
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {isEdit ? 'Edit Blog Post' : 'Create New Post'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {isEdit ? 'Update Post' : 'Create Post'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BlogForm;
