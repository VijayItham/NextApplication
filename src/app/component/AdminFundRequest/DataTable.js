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
} from "@mui/material";

const DataTable = ({
  data,
  column,
  searchBy,
  setIsApprove,
  setIsReject,
  setSelectedRow,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleReject = (row) => {
    setSelectedRow(row);
    setIsReject(true);
  };

  const handleApprove = (row) => {
    setSelectedRow(row);
    setIsApprove(true);
  };

  console.log('data-->', data,'searchBy-->', searchBy)

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
  const keys = Object.keys(paginatedRows?.[0]??[]);
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
                <TableCell key={header.field}>
                  {header.isSortable ? (
                    <TableSortLabel
                      active={orderBy === header.field}
                      direction={orderBy === header.field ? order : "asc"}
                      onClick={() => handleSortRequest(header.field)}
                    >
                      <h4>{header.title}</h4>
                    </TableSortLabel>
                  ) : (
                   header.hide
                  )}
                </TableCell>
              ))}
              <TableCell>
                <h4>Actions</h4>
              </TableCell>
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
                      onClick={() => handleApprove(row)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReject(row)}
                      style={{ marginLeft: "2px" }}
                    >
                      Reject
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
