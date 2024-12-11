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
import { fetchOperatorType } from "@/app/redux/OperatorTypeSlice";
import { addOperator, updateOperator } from "@/app/redux/OperatorSlice";
import { fetchOperator } from "@/app/redux/OperatorSlice";

export default function AddOperator({
  setIsAddOperator,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    operatorTypeId:"",
    operatorName:"",
    operatorCode:""
  });
  const dispatch = useDispatch();
  const { operatorTypeData } = useSelector((data) => data.operatorTypeReducer);

  console.log('operatorTypeData123123', operatorTypeData)

  useEffect(() => {
    dispatch(fetchOperatorType());
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
        await dispatch(updateOperator(formData));
        setMessage("Data Updated Succefully");
    } else {
        await dispatch(addOperator(formData));
        setMessage("Data Save Succefully");
    }
    dispatch(fetchOperator());
    setIsEdit(false);
    setIsAddOperator(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAddOperator(false);
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
        {isEdit ? "Update" : "Add"} Operator
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Operator Type</InputLabel>
            <Select
              labelId="operator-select-label"
              name="operatorTypeId"
              value={formData.operatorTypeId}
              onChange={handleChange}
              variant="outlined"
              required
              disabled={isEdit}
            >
              {operatorTypeData.map(({ operatorTypeId, operatorTypeName }) => (
                <MenuItem key={operatorTypeId} value={operatorTypeId}>
                  {operatorTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="operatorName"
            label="Operator Name"
            variant="outlined"
            value={formData.operatorName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="operatorCode"
            label="Operator Code"
            variant="outlined"
            value={formData.operatorCode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained">
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
