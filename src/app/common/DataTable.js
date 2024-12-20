"use client";

import {  useState } from "react";
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
      row[searchBy]
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
    )
    .sort((a, b) => {
      if (!orderBy) return 0;
      const aVal = a[orderBy] ?? "";
      const bVal = b[orderBy] ?? "";
      if (order === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ borderRadius: "10px", position:"relative", top:"25px"  }}>
      <SearchIcon className={styles.searchIcon} />
      <TextField
        variant="outlined"
        placeholder="Search for records"
        fullWidth
        sx={{
          width: "35%",
          position:"relative",
          right:"10px",
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
                .filter((header) => header.isVisible)
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
            {paginatedRows.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                sx={{
                  borderBottom: "1px solid #ddd",
                }}
              >
                {column
                  .filter((header) => header.isVisible)
                  .map((header) => (
                    <TableCell
                      key={`${header.field}-${rowIndex}`}
                      sx={{ padding: "8px"}}
                    >
                      {row[header.field]}
                    </TableCell>
                  ))}
                <TableCell style={{ width: "13.5rem", display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row)}
                    sx={{ marginLeft: "8px" }}
                    className={styles.btn}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
