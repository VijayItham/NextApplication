"use client";

import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { deleteWallet } from "../../redux/WalletSlice";

export default function DeleteWallet({ data, isDelete, setIsDelete }) {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteWallet(data))
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
