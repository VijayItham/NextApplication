"use client";

import { deleteOperator } from "../../redux/OperatorSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { fetchOperator } from "@/app/redux/OperatorSlice";

import { useDispatch } from "react-redux";

export default function DeleteOperator({
  data,
  setIsDelete,
  isDelete,
  setMessage,
  setOpenSnackbar,
}) {
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    await dispatch(deleteOperator(data.operatorId));
    setIsDelete(false);
    setMessage("Data Deleted Succefully!");
    setOpenSnackbar(true);
    dispatch(fetchOperator());
  };

  return (
    <Dialog open={isDelete} onClose={() => setIsDelete(false)}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>Are you sure you want to delete this row?</DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDelete(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
