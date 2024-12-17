"use client";

import { deleteRoleMenu, fetchRoleMenu } from "../../redux/RoleMenuSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";

export default function DeleteRoelMenu({ data, setIsDelete, isDelete, setMessage, setOpenSnackbar }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = async() => {
       await dispatch(deleteRoleMenu(data.roleMenuId))
        setIsDelete(false)
        setMessage("Data Deleted Succefully!")
        setOpenSnackbar(true);
        dispatch(fetchRoleMenu());
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