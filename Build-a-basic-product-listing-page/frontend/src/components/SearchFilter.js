import React from 'react';
import { TextField, Box, Button } from '@mui/material';

const SearchFilter = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <Box display="flex" gap={2} marginBottom={2}>
      <TextField label="Search Name" name="search_name" value={filters.search_name} onChange={handleChange} />
      <TextField label="Min Price" name="min_price" type="number" value={filters.min_price} onChange={handleChange} />
      <TextField label="Max Price" name="max_price" type="number" value={filters.max_price} onChange={handleChange} />
      <TextField label="Min Rating" name="min_rating" type="number" value={filters.min_rating} onChange={handleChange} />
      <TextField label="Max Rating" name="max_rating" type="number" value={filters.max_rating} onChange={handleChange} />
      <TextField label="Sort By" name="sort_by" value={filters.sort_by} onChange={handleChange} placeholder="name or price" />
      <Button variant="contained" onClick={onSearch}>Apply</Button>
    </Box>
  );
};

export default SearchFilter;