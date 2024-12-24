"use client";

import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchOperator } from "@/app/redux/OperatorSlice";
import {
  addUserCommission,
  updateUserCommission,
} from "@/app/redux/UserCommissionSlice";
import { fetchUserCommission } from "@/app/redux/UserCommissionSlice";
import styles from "./UserCommission.module.css";

export default function AddUserCommission({
  setIsAddUserCommission,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    operatorId: "",
    userName: "",
    commissionAmount: "",
  });
  const dispatch = useDispatch();
  const { operatorData } = useSelector((data) => data.operatorReducer);

  useEffect(() => {
    dispatch(fetchOperator());
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateUserCommission(formData));
      setMessage("Data Updated Succefully");
    } else {
      await dispatch(addUserCommission(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchUserCommission());
    setIsEdit(false);
    setIsAddUserCommission(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAddUserCommission(false);
    setIsEdit(false);
  };

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
        {isEdit ? "Update" : "Add"} UserCommission
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Operator</InputLabel>
            <Select
              labelId="user-select-label"
              name="operatorId"
              value={formData.operatorId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {operatorData.map(({ operatorId, operatorName }) => (
                <MenuItem key={operatorId} value={operatorId}>
                  {operatorName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="userName"
            label="User Name"
            variant="outlined"
            value={formData.userName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="commissionAmount"
            label="Commission Amount"
            variant="outlined"
            value={formData.commissionAmount}
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
