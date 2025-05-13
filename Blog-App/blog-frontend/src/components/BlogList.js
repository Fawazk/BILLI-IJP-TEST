import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Stack,
} from '@mui/material';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    API.get('posts/')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      API.delete(`posts/${id}/`)
        .then(() => {
          // Remove from UI after delete
          setPosts((prev) => prev.filter((post) => post.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/edit/${post.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BlogList;
