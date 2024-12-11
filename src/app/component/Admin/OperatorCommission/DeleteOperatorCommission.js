"use client";

import { deleteOperatorCommission } from "../../../redux/OperatorCommissionSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { fetchOperatorCommission } from "@/app/redux/OperatorCommissionSlice";

import { useDispatch } from "react-redux";

export default function DeleteOperatorCommission({ data, setIsDelete, isDelete, setMessage, setOpenSnackbar }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = async() => {
       await dispatch(deleteOperatorCommission(data.operatorCommissionId))
        setIsDelete(false)
        setMessage("Data Deleted Succefully!")
        setOpenSnackbar(true);
        dispatch(fetchOperatorCommission());
    }

    return (
        <Dialog open={isDelete} onClose={() => setIsDelete(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
            Are you sure you want to delete this row?
        </DialogContent>
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