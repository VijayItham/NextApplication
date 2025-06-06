"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchRoleMenu } from "@/app/redux/RoleMenuSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddRoleMenu from "./AddRoleMenu";
import DeleteRoleMenu from "./DeleteRoleMenu";
import { column } from "@/app/constants/RoleMenuConst";
import styles from "./RoleMenu.module.css";

export default function DisplayRoleMenu() {
  const dispatch = useDispatch();
  const { isLoading, roleMenuData } = useSelector((data) => {
    return data.roleMenuReducer;
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updatedRoleMenuData = roleMenuData.map((item) =>
    omit(item, [
      "menuId",
      "appRoleId",
      "controllerName",
      "actionName",
      "displayOrder",
    ])
  );

  useEffect(() => {
    dispatch(fetchRoleMenu());
  }, []);
  const handleRoleMenu = () => setIsAdd(true);

  const selectedAllRowData = roleMenuData.filter(
    (item) => item.roleMenuId === selectedRow.roleMenuId
  );

  return (
    <Box className={styles.container}>
      <Box sx={{ width: "93%", margin: "20px auto", marginRight: "3rem" }}>
        <Box mb={2}>
          {!isAdd && !isEdit && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={styles.btn}
              onClick={handleRoleMenu}
            >
              Assign Menu
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
          !isEmpty(updatedRoleMenuData) &&
          !isAdd &&
          !isEdit && (
            <DataTable
              searchBy="roleName"
              setIsEdit={setIsEdit}
              setIsDelete={setIsDelete}
              setSelectedRow={setSelectedRow}
              data={updatedRoleMenuData}
              column={column}
            />
          )
        )}
        {(isAdd || isEdit) && (
          <AddRoleMenu
            setIsEdit={setIsEdit}
            setIsAdd={setIsAdd}
            isEdit={isEdit}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            data={selectedAllRowData[0]}
          />
        )}
        {isDelete && (
          <DeleteRoleMenu
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
