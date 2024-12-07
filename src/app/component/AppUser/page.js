"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchAppUser } from "@/app/redux/AppUserSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddAppUser from "./AddAppUser";
import DeleteAppUser from "./DeleteAppUser";
import { column } from "@/app/constants/AppUserConst";
import { isLoggedIn } from "../../api/auth";
import { useRouter } from "next/navigation";

export default function DisplayAppUser() {
  const dispatch = useDispatch();
  const { isLoading, appUserData } = useSelector((data) => data.appUserReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchAppUser());
    }
    else{
      router.push('/')
    }
  }, []);

  // Handle user data omitting unnecessary fields
  const updatedUserData = appUserData.map((item) =>
    omit(item, [
      "middleName",
      "appRoleId",
      "password",
      "address2",
      "stateId",
      "cityId",
      "countryId",
      "panImage",
      "aadharImageBack",
      "aadharImageFront",
      "createdBy",
    ])
  );
  const handleAddUser = () => setIsAddUser(true);
  const selectedAllRowData = appUserData.filter(
    (item) => item.appUserId === selectedRow.appUserId
  );
  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <Box mb={2}>
        {!isAddUser && !isEdit &&  (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            Add User
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
        !isEmpty(updatedUserData) &&
        !isAddUser &&
        !isEdit && (
          <DataTable
            searchBy="userName"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={updatedUserData}
            column={column}
          />
        )
      )}
      {(isAddUser || isEdit) && (
        <AddAppUser
          setIsEdit={setIsEdit}
          setIsAddUser={setIsAddUser}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteAppUser
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
