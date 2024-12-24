"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Snackbar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { isEmpty } from "lodash";

import styles from "./News.module.css";
import LoadingSpinner from "../../common/Loading";
import DataTable from "@/app/common/DataTable";
import AddNews from "./AddNews";
import DeleteNews from "./DeleteNews";
import { fetchAllNews } from "@/app/redux/NewsSlice";
import { column } from "@/app/constants/NewsMenuConst";

export default function News() {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAddNews, setIsAddNews] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const { isLoading, newsData } = useSelector((state) => state?.newsReducer);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  const handleAddNews = () => {
    setIsAddNews(true);
    setIsEdit(false);
  };

  return (
    <Box
      style={{
        position: "fixed",
        width: "82.5vw",
        top: "9.5rem",
        bottom: 0,
        height: "100vh",
        backgroundColor: "#FBF8F3",
        left: "17.5rem",
        overflowY: "auto",
      }}
    >
      <Box sx={{ width: "93%", margin: "20px auto", marginRight: "3rem" }}>
        <Box sx={{ display: "flex", marginBottom: "10px" }}>
          {!isAddNews && !isEdit && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNews}
              className={styles.btn}
            >
              Add News
            </Button>
          )}
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          !isEmpty(newsData) &&
          !isAddNews &&
          !isEdit && (
            <DataTable
              searchBy="title"
              setIsEdit={setIsEdit}
              setIsDelete={setIsDelete}
              setSelectedRow={setSelectedRow}
              data={newsData}
              column={column}
            />
          )
        )}

        {(isAddNews || isEdit) && (
          <AddNews
            setIsEdit={setIsEdit}
            setIsAddNews={setIsAddNews}
            isEdit={isEdit}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            data={selectedRow || {}}
          />
        )}

        {isDelete && (
          <DeleteNews
            data={selectedRow}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        )}
      </Box>
    </Box>
  );
}
