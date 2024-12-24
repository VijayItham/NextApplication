"use client";
import { fetchAllUserWalletSummary } from "@/app/redux/UserWalletSummarySlice";
import { deleteUserWalletSummary } from "@/app/redux/UserWalletSummarySlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function DeleteUserWalletSummary({
  data,
  setIsDelete,
  isDelete,
  setMessage,
  setOpenSnackbar,
}) {
  const dispatch = useDispatch();
  const handleConfirmDelete = async () => {
    await dispatch(deleteUserWalletSummary(data.userWalletSummaryId));
    setIsDelete(false);
    setMessage("Data Deleted Succefully!");
    setOpenSnackbar(true);
    dispatch(fetchAllUserWalletSummary());
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
