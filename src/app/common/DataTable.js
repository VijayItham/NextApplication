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
import SearchIcon from "@mui/icons-material/Search";
import styles from "./DataTable.module.css";

const DataTable = ({
  data,
  column,
  searchBy,
  setIsEdit,
  setIsDelete,
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

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEdit(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDelete(true);
  };

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

  const keys = Object.keys(paginatedRows?.[0] ?? []);

  return (
    <Paper sx={{ borderRadius: "10px", marginTop: "31px" }}>
      <SearchIcon className={styles.searchIcon} />
      <TextField
        variant="outlined"
        placeholder="Search for records"
        fullWidth
        sx={{
          width: "35%",
          marginLeft: "5px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#784800",
            },
            "& input": {
              position: "relative",
              left: "2.5rem",
            },
          },
        }}
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {column
                .filter((header) => header.isVisible) // Show only columns where isVisible is true
                .map((header) => (
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
                      <h4>{header.title}</h4>
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
                  {keys
                    .filter((key) => {
                      const header = column.find((col) => col.field === key);
                      return header && header.isVisible; // Show only if isVisible is true
                    })
                    .map((key) => (
                      <TableCell key={key}>{row[key]}</TableCell>
                    ))}
                  <TableCell style={{ width: "11rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(row)} // Pass the full row data, including hidden properties
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(row)} // Pass the full row data, including hidden properties
                      sx={{ marginLeft: "8px" }}
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
        sx={{ height: "200px", position: "relative", right: "25rem" }}
      />
    </Paper>
  );
};

export default DataTable;
