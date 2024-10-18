"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DataTable = ({ data, column, searchBy, setIsEdit, setIsDelete, setSelectedRow }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  //const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  //const [selectedRow, setSelectedRow] = useState(null); // Track selected row for edit/delete

  // Handle sorting
  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (row) => {
    setSelectedRow(row); 
    setIsEdit(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDelete(true); 
              };

  const dynamicKeys = Object.keys(data[0]);

  const filteredRows = data
    .filter((row) =>
      row[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const keys = Object.keys(paginatedRows[0]);
  return (
    <Paper>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {column.map((header) => (
                <TableCell key={header.field} >
                  {header.isSortable ? (
                    <TableSortLabel
                      active={orderBy === header.field}
                      direction={orderBy === header.field ? order : "asc"}
                      onClick={() => handleSortRequest(header.field)}                 
                    >
                      <h4>{header.title}</h4>
                    </TableSortLabel>
                  ) : (
                    header.field
                  )}
                </TableCell>
              ))}
              <TableCell><h4>Actions</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => {
              const rowKey = keys.map((key) => row[key]).join("-");
              return (
                <TableRow key={rowKey}>
                  {keys.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(row)}
                      style={{marginLeft:'2px'}}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
