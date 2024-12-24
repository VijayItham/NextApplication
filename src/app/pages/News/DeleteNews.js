import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAllNews } from "@/app/redux/NewsSlice";
import { deleteNews } from "@/app/redux/NewsSlice";

export default function DeleteNews({
  data,
  setIsDelete,
  isDelete,
  setMessage,
  setOpenSnackbar,
}) {
  const dispatch = useDispatch();

  const value = {
    newsId: data?.newsId,
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteNews(value));
    setIsDelete(false);
    setMessage("Data Deleted Succefully!");
    setOpenSnackbar(true);
    dispatch(fetchAllNews());
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
