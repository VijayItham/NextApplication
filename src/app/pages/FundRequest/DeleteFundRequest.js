"use client";

import { deleteFundRequest } from "../../redux/FundRequestSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { fetchFundRequest } from "@/app/redux/FundRequestSlice";

import { useDispatch } from "react-redux";

export default function DeleteFundRequest({ data, setIsDelete, isDelete, setMessage, setOpenSnackbar }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = async() => {
       await dispatch(deleteFundRequest(data.fundRequestId))
        setIsDelete(false)
        setMessage("Data Deleted Succefully!")
        setOpenSnackbar(true);
        dispatch(fetchFundRequest());
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