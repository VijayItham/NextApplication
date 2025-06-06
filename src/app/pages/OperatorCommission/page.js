"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { omit, isEmpty } from "lodash";
import { Button, Box, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchOperatorCommission } from "@/app/redux/OperatorCommissionSlice";
import DataTable from "../../common/DataTable";
import LoadingSpinner from "../../common/Loading";
import AddOperatorCommission from "./AddOperatorCommission";
import DeleteOperatorCommission from "./DeleteOperatorCommission";
import { column } from "@/app/constants/OperatorCommissionConst";
import styles from "./OperatorCommision.module.css";

export default function DisplayOperatorCommission() {
  const dispatch = useDispatch();
  const { isLoading, operatorCommissionData } = useSelector((data) => data.operatorCommissionReducer);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isAddOperatorCommission, setIsAddOperatorCommission] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchOperatorCommission());
  }, []);

  const updatedOperatorCommissionData = operatorCommissionData.map((item) =>
    omit(item, [
      "maxAmountDistribution",
    ]));

  const handleAddOperatorCommission = () => setIsAddOperatorCommission(true);

  const selectedAllRowData = operatorCommissionData.filter(
    (item) => item.operatorCommissionId === selectedRow.operatorCommissionId
  );

  return (
    <Box className={styles.container}>
      <Box sx={{ width:"93%", margin:"20px auto" , marginRight:"3rem"}}>
      <Box mb={2}>
        {!isAddOperatorCommission && !isEdit && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOperatorCommission}
            className={styles.btn}
          >
            Add OperatorCommission
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
        !isEmpty(updatedOperatorCommissionData) &&
        !isAddOperatorCommission &&
        !isEdit && (
          <DataTable
            searchBy="operatorName"
            setIsEdit={setIsEdit}
            setIsDelete={setIsDelete}
            setSelectedRow={setSelectedRow}
            data={updatedOperatorCommissionData}
            column={column}
          />
        )
      )}
      {(isAddOperatorCommission || isEdit) && (
        <AddOperatorCommission
          setIsEdit={setIsEdit}
          setIsAddOperatorCommission={setIsAddOperatorCommission}
          isEdit={isEdit}
          setOpenSnackbar={setOpenSnackbar}
          setMessage={setMessage}
          data={selectedAllRowData[0]}
        />
      )}
      {isDelete && (
        <DeleteOperatorCommission
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
