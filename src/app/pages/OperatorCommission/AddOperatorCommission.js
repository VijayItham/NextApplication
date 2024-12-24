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
import { fetchAmountType } from "@/app/redux/AmountTypeSlice";
import { fetchOperator } from "@/app/redux/OperatorSlice";
import styles from "./OperatorCommision.module.css";
import {
  addOperatorCommission,
  updateOperatorCommission,
} from "@/app/redux/OperatorCommissionSlice";
import { fetchOperatorCommission } from "@/app/redux/OperatorCommissionSlice";

export default function AddOperatorCommission({
  setIsAddOperatorCommission,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    operatorId: "",
    commissionAmount: "",
    commissionMargin: "",
    amountTypeId: "",
  });
  const dispatch = useDispatch();
  const { operatorData } = useSelector((data) => data.operatorReducer);
  const { amountTypeData } = useSelector((data) => data.amountTypeReducer);

  useEffect(() => {
    dispatch(fetchAmountType());
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
      await dispatch(updateOperatorCommission(formData));
      setMessage("Data Updated Succefully");
    } else {
      await dispatch(addOperatorCommission(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchOperatorCommission());
    setIsEdit(false);
    setIsAddOperatorCommission(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAddOperatorCommission(false);
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
        {isEdit ? "Update" : "Add"} OperatorCommission
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Operator</InputLabel>
            <Select
              labelId="operator-select-label"
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
            name="commissionAmount"
            label="Commission Amount"
            variant="outlined"
            value={formData.commissionAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="commissionMargin"
            label="Commission Margin"
            variant="outlined"
            value={formData.commissionMargin}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Amount Type</InputLabel>
            <Select
              labelId="operator-select-label"
              name="amountTypeId"
              value={formData.amountTypeId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {amountTypeData.map(({ amountTypeId, amountTypeName }) => (
                <MenuItem key={amountTypeId} value={amountTypeId}>
                  {amountTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained" className={styles.Btn}>
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={onCancel} variant="outlined" className={styles.Btn}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
