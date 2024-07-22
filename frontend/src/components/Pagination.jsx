import React from 'react';
import './Pagination.css';
import Pagination from '@mui/material/Pagination';

export default function CustomPagination({ currentPage, totalPages, setCurrentPage }) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Pagination className='Pagination'
      count={totalPages} 
      page={currentPage} 
      onChange={handleChange} 
      color="primary" 
    />
  );
}
