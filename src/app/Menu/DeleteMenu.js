"use client";

import { deleteMenu, fetchMenu } from "../redux/MenuSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";

export default function DeleteMenu({ data, setIsDelete, isDelete, setMessage, setOpenSnackbar }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = async() => {
       await dispatch(deleteMenu(data.menuId))
        setIsDelete(false)
        setMessage("Data Deleted Succefully!")
        setOpenSnackbar(true);
        dispatch(fetchMenu());
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