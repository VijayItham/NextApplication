"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchOperator } from "@/app/redux/OperatorSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddOperator from "./AddOperator";
import DeleteOperator from "./DeleteOperator";
import { column } from "@/app/constants/OperatorConst";
import { isLoggedIn } from "../../api/auth";
import { useRouter } from "next/navigation";
import styles from "./Operator.module.css";

export default function DisplayOperator() {
  const dispatch = useDispatch();
  const { isLoading, operatorData } = useSelector((data) => data.operatorReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddOperator, setIsAddOperator] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchOperator());
    }
    else{
      router.push('/')
    }
  }, []);

  const updatedUserData = operatorData.map((item) =>item);
  
  console.log('updatedUserData===>', updatedUserData)
   
  const handleAddOperator = () => setIsAddOperator(true);
  const selectedAllRowData = operatorData.filter(
    (item) => item.operatorId === selectedRow.operatorId
  );
  return (
    <Box className={styles.container}>
      <Box mb={2}>
        {!isAddOperator && !isEdit &&  (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOperator}
          >
            Add Operator
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
        !isAddOperator &&
        !isEdit && (
          <DataTable
            searchBy="operatorTypeName"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={updatedUserData}
            column={column}
          />
        )
      )}
      {(isAddOperator || isEdit) && (
        <AddOperator
          setIsEdit={setIsEdit}
          setIsAddOperator={setIsAddOperator}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteOperator
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
