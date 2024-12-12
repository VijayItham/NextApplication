"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

import { fetchMenu } from "../../redux/MenuSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddMenu from "./AddMenu";
import DeleteMenu from "./DeleteMenu";
import { usePathname } from "next/navigation";

import { column } from "@/app/constants/AppMenuConst";

export default function DisplayMenu() {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, menuData } = useSelector((data) => {
    return data.menuReducer
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);
  const handleMenu = () => setIsAdd(true);
  const selectedAllRowData = menuData.filter(
    (item) => item.menuId === selectedRow.menuId
  );

  return (
    <Box style={{ position: 'fixed', width: "81vw", top: "5.8rem", bottom: 0, height:"100vh",   backgroundColor: "#FBF8F3",   left: "17.5rem", right:"30px", overflowY: "auto"}}>
       
       <Box sx={{display:"flex",}}>
      <Box mb={2}>
        {!isAdd && !isEdit && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleMenu}
          >
            Add Menu
          </Button>
        )}
       
      </Box>
       <Box sx={{marginTop:"5px", textAlign:"center", color:"#333333", position:"relative", left:"20rem" ,fontSize:"25px"}}>{pathName.split('/').pop()}</Box>
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
    </Box>
  );
}
