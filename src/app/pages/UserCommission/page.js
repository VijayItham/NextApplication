"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchUserCommission } from "@/app/redux/UserCommissionSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddUserCommission from "./AddUserCommission";
import DeleteUserCommission from "./DeleteUserCommission";
import { column } from "@/app/constants/UserCommissionConst";
import styles from "./UserCommission.module.css";

export default function DisplayUserCommission() {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddUserCommission, setIsAddUserCommission] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, userCommissionData } = useSelector((data) => data.userCommissionReducer);
  
  useEffect(() => {
      dispatch(fetchUserCommission());
  }, []);

  const updatedUserCommissionData = userCommissionData.map((item) => item);
  
  const handleAddUserCommission = () => setIsAddUserCommission(true);
  const selectedAllRowData = userCommissionData.filter(
    (item) => item.userCommissionId === selectedRow.userCommissionId
  );

  return (
    <div style={{ position: 'fixed', minHeight: '200px',bottom: 0,  width: "81vw", top: "9.5rem", left: "17.5rem",backgroundColor: "#FBF8F3", overflowY:"auto" }}>
        <Box sx={{ width:"93%", margin:"20px auto" , marginRight:"3rem"}}>
      <Box mb={2}>
        {!isAddUserCommission && !isEdit &&  (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUserCommission}
            className={styles.btn}
          >
            Add User Commission 
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
        !isEmpty(updatedUserCommissionData) &&
        !isAddUserCommission &&
        !isEdit && (
          <DataTable
            searchBy="userName"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={updatedUserCommissionData}
            column={column}
          />
        )
      )}
      {(isAddUserCommission || isEdit) && (
        <AddUserCommission
          setIsEdit={setIsEdit}
          setIsAddUserCommission={setIsAddUserCommission}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteUserCommission
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
