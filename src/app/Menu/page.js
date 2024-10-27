"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { isLoggedIn } from "../common/auth";
import { useRouter } from "next/navigation";

import { fetchMenu } from "../redux/MenuSlice";
import DataTable from "../common/DataTable";
import LoadingSpinner from "../common/Loading";
import AddMenu from "./AddMenu";
import DeleteMenu from "./DeleteMenu";

import { column } from "@/app/constants/AppMenuConst";

export default function DisplayMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, menuData } = useSelector((data) => {
    console.log('data123', data)
    return data.menuReducer
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if(isLoggedIn()){
      dispatch(fetchMenu());
    }
    else{
      router.push('/')
    }
  }, []);
  console.log('menuData', menuData)
  const handleMenu = () => setIsAdd(true);
  const selectedAllRowData = menuData.filter(
    (item) => item.menuId === selectedRow.menuId
  );
  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <Box mb={2}>
        {!isAdd && !isEdit && isLoggedIn() && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleMenu}
          >
            Add Menu
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
        !isEmpty(menuData) &&
        !isAdd &&
        !isEdit && (
          <DataTable
            searchBy="menuName"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={menuData}
            column={column}
          />
        )
      )}
      {(isAdd || isEdit) && (
        <AddMenu
          setIsEdit={setIsEdit}
          setIsAdd={setIsAdd}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteMenu
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
