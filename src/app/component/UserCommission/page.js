"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchUserCommission } from "@/app/redux/UserCommissionSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddUserCommission from "./AddUserCommission";
import DeleteUserCommission from "./DeleteUserCommission";
import { column } from "@/app/constants/UserCommissionConst";
import { isLoggedIn } from "../../api/authCookies";
import { useRouter } from "next/navigation";

export default function DisplayUserCommission() {
  const dispatch = useDispatch();
  const { isLoading, userCommissionData } = useSelector((data) => data.userCommissionReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddUserCommission, setIsAddUserCommission] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  console.log('userCommissionData==>', userCommissionData)

  useEffect(() => {
      dispatch(fetchUserCommission());
  }, []);

  const updatedUserCommissionData = userCommissionData.map((item) => item);
  
   console.log('updatedUserCommissionData', updatedUserCommissionData)
  const handleAddUserCommission = () => setIsAddUserCommission(true);
  const selectedAllRowData = userCommissionData.filter(
    (item) => item.userCommissionId === selectedRow.userCommissionId
  );
  console.log('selectedAllRowData', selectedAllRowData)
  return (
    <div style={{ position: 'fixed', minHeight: '200px',bottom: 0,  width: "81vw", top: "5.8rem", left: "17.5rem",backgroundColor: "#FBF8F3", }}>
      <Box mb={2}>
        {!isAddUserCommission && !isEdit &&  (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUserCommission}
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
    </div>
  );
}
