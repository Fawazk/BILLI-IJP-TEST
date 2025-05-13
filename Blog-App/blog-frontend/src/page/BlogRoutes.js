import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import BlogList from '../components/BlogList';
import BlogDetail from '../components/BlogDetail';
import BlogForm from '../components/BlogForm';

function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/create" element={<BlogForm />} />
      <Route path="/edit/:id" element={<EditWrapper />} />
      <Route path="/post/:id" element={<BlogDetail />} />
    </Routes>
  );
}

// Wrapper to extract URL param and pass to BlogForm
function EditWrapper() {
  const { id } = useParams();
  return <BlogForm postId={id} />;
}

export default BlogRoutes;
