import React, { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    API.delete(`posts/${id}/`).then(() => navigate('/'));
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {post.content}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete Post
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BlogDetail;
