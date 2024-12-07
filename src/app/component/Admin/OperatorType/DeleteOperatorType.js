"use client";

import { deleteOperatorType } from "../../../redux/OperatorTypeSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import { useDispatch } from "react-redux";

export default function DeleteOperatorType({ data, setIsDelete, isDelete }) {
    const dispatch = useDispatch();

    const handleConfirmDelete = () => {
        dispatch(deleteOperatorType(data))
        setIsDelete(false)
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