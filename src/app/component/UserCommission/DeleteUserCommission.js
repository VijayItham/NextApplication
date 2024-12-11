"use client";

import { deleteUserCommission } from "../../redux/UserCommissionSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { fetchUserCommission } from "@/app/redux/UserCommissionSlice";

import { useDispatch } from "react-redux";

export default function DeleteUserCommission({ data, setIsDelete, isDelete, setMessage, setOpenSnackbar }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = async() => {
       await dispatch(deleteUserCommission(data.userCommissionId))
        setIsDelete(false)
        setMessage("Data Deleted Succefully!")
        setOpenSnackbar(true);
        dispatch(fetchUserCommission());
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