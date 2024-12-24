"use client";
import { Box, Button, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import styles from "./UserWalletSummary.module.css";
import LoadingSpinner from "@/app/common/Loading";
import { useSelector } from "react-redux";
import AddUserWalletSummary from "./AddUserWalletSummary";
import DeleteUserWalletSummary from "./DeleteUserWalletSummary";
import { fetchAllUserWalletSummary } from "@/app/redux/UserWalletSummarySlice";
import { useDispatch } from "react-redux";
import DataTable from "@/app/common/DataTable";
import { column } from "@/app/constants/UserWalletSummaryConst";

export default function UserWalletSummary() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [message, setMessage] = useState("");
  const [isAddUserWalletSummary, setIsAddUserWalletSummary] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { isLoading, userWalletSummaryData } = useSelector(
    (data) => data.userWalletSummaryReducer
  );

  useEffect(() => {
    dispatch(fetchAllUserWalletSummary());
  }, [dispatch]);

  const handleAddUserWalletSummary = () => setIsAddUserWalletSummary(true);

  const updatedUserWalletSummaryData = userWalletSummaryData.map(
    (item) => item
  );

  const selectedAllRowData = userWalletSummaryData.filter(
    (item) => item.userWalletSummaryId === selectedRow.userWalletSummaryId
  );

  return (
    <div
      style={{
        position: "fixed",
        minHeight: "200px",
        bottom: 0,
        width: "81vw",
        top: "9.5rem",
        left: "17.5rem",
        backgroundColor: "#FBF8F3",
        overflowY: "auto",
      }}
    >
      <Box sx={{ width: "93%", margin: "20px auto", marginRight: "3rem" }}>
        <Box mb={2}>
          {!isAddUserWalletSummary && !isEdit && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddUserWalletSummary}
              className={styles.btn}
            >
              Add User Wallet Summary
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
          !isEmpty(updatedUserWalletSummaryData) &&
          !isAddUserWalletSummary &&
          !isEdit && (
            <DataTable
              searchBy="userName"
              setIsEdit={setIsEdit}
              setIsDelete={setIsDelete}
              setSelectedRow={setSelectedRow}
              data={updatedUserWalletSummaryData}
              column={column}
            />
          )
        )}
        {(isAddUserWalletSummary || isEdit) && (
          <AddUserWalletSummary
            setIsEdit={setIsEdit}
            setIsAddUserWalletSummary={setIsAddUserWalletSummary}
            isEdit={isEdit}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            data={selectedAllRowData[0]}
          />
        )}
        {isDelete && (
          <DeleteUserWalletSummary
            data={selectedRow}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        )}
      </Box>
    </div>
  );
}
