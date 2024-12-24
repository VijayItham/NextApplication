"user client";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  addUserWalletSummary,
  fetchAllUserWalletSummary,
  updateUserWalletSummary,
} from "@/app/redux/UserWalletSummarySlice";
import styles from "./UserWalletSummary.module.css";

export default function AddUserWalletSummary({
  setIsAddUserWalletSummary,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    walletId: "",
    currentBalance: "",
    totalCreditAmount: "",
    totalDebitAmount: "",
  });

  useEffect(() => {
    if (isEdit) {
      setFormData(data);
    }
  }, []);

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCancel = () => {
    setIsAddUserWalletSummary(false);
    setIsEdit(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateUserWalletSummary(formData));
      setMessage("Data Updated Succefully");
    } else {
      await dispatch(addUserWalletSummary(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchAllUserWalletSummary());
    setIsEdit(false);
    setIsAddUserWalletSummary(false);
    setOpenSnackbar(true);
  };

  const dispatch = useDispatch();
  const { userWalletSummaryData } = useSelector(
    (data) => data.userWalletSummaryReducer
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxHeight: "90vh",
        overflowY: "auto",
        p: 3,
        backgroundColor: "white",
        boxShadow: 3,
        borderRadius: 2,
        width: "100%",
        maxWidth: "1000px",
      }}
    >
      <Typography variant="h5" mb={2}>
        {isEdit ? "Update" : "Add"} UserWalletSummary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">UserName</InputLabel>
            <Select
              labelId="user-select-label"
              name="walletId"
              value={formData.walletId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {userWalletSummaryData.map(({ walletId, userName }) => (
                <MenuItem key={walletId} value={userName}>
                  {userName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="currentBalance"
            label="Current Balance"
            variant="outlined"
            value={formData.currentBalance}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="totalCreditAmount"
            label="Total Credit Amount"
            variant="outlined"
            value={formData.totalCreditAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="totalDebitAmount"
            label="TotalDebitAmount"
            variant="outlined"
            value={formData.totalDebitAmount}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained" className={styles.btn}>
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={onCancel}
            variant="outlined"
            className={styles.btn}
            style={{ color: "white" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
