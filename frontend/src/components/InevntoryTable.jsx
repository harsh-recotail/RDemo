import React from 'react';
import "./InventoryTable.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function InventoryTable({ inventory }) {
  return (
    <TableContainer className='InventoryTable' component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><b>Date</b></StyledTableCell>
            <StyledTableCell align="center">Amazon Order ID</StyledTableCell>
            <StyledTableCell align="center">Reimbursement ID</StyledTableCell>
            <StyledTableCell align="center">Case ID</StyledTableCell>
            <StyledTableCell align="center">Reason</StyledTableCell>
            <StyledTableCell align="center">SKU</StyledTableCell>
            <StyledTableCell align="center">FNSKU</StyledTableCell>
            <StyledTableCell align="center">ASIN</StyledTableCell>
            <StyledTableCell align="center">Condition</StyledTableCell>
            <StyledTableCell align="center">Currency Unit</StyledTableCell>
            <StyledTableCell align="center">Amount Per Unit</StyledTableCell>
            <StyledTableCell align="center">Amount Total</StyledTableCell>
            <StyledTableCell align="center">Quantity Reimbursed Cash</StyledTableCell>
            <StyledTableCell align="center">Quantity Reimbursed Inventory</StyledTableCell>
            <StyledTableCell align="center">Quantity Reimbursed Total</StyledTableCell>
            <StyledTableCell align="center">Original Reimbursement ID</StyledTableCell>
            <StyledTableCell align="center">Original Reimbursement Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center"><b>{item.data['approval-date']}</b></StyledTableCell>
              <StyledTableCell align="center">{item.data['amazon-order-id']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['reimbursement-id']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['case-id']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['reason']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['sku']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['fnsku']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['asin']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['condition']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['currency-unit']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['amount-per-unit']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['amount-total']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['quantity-reimbursed-cash']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['quantity-reimbursed-inventory']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['quantity-reimbursed-total']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['original-reimbursement-id']}</StyledTableCell>
              <StyledTableCell align="center">{item.data['original-reimbursement-type']}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
