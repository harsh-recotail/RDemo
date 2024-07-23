import React, { useState, useEffect } from 'react';
import './App.css';
import InventoryTable from './components/InevntoryTable';
import Pagination from './components/Pagination';

export default function App() {
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://54.235.196.58:4000/api/inventory?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setInventory(data.inventory);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  return (
   <main>
    <img className="reco" src='/images/recotail.png' alt="Recotail Logo" height="50" />
    <h1 className='h1'>FBA Reimbursement Data</h1>
    <InventoryTable inventory={inventory} />
    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
   </main>
  );
};
