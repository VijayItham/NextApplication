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
  Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRecharge } from "@/app/redux/RechargeSlice";
import { fetchOperator } from "@/app/redux/OperatorSlice";
import { getUserDetails } from "../api/authCookies";
import styles from "./Recharge.module.css";

export default function Recharge() {
  const [operatorName, setOperatorName]=useState('');
  const [formData, setFormData] = useState({
    userName:"",
    mobileNo:"",
    amount:"",
    operatorName:"",
    circleCode:"",
  });
  const dispatch = useDispatch();
  const { operatorData } = useSelector((data) => data.operatorReducer);
  const { rechargeData } = useSelector((data) => data.rechargeReducer);
  
  useEffect(() => {
    dispatch(fetchOperator());
  }, []);
  
  const handleChange = async (e) => {
      if(e.target.name=="operatorId"){
        setOperatorName(e.target.value)
      }
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.userName=getUserDetails().userName
    formData.operatorName=operatorName;
    await dispatch(addRecharge(formData));
   // setMessage("Data Save Succefully");
  };

  return (
    <Box className = {styles.container}>
        <Box sx={{ width:"90%", margin:"20px auto", marginRight:"5rem"}}>
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
        Recharge Mobile
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
                <MenuItem key={operatorId} value={operatorName}>
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
            name="circleCode"
            label="Circle"
            variant="outlined"
            value={formData.circleCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="mobileNo"
            label="Mobile No."
            variant="outlined"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="amount"
            label="Amount"
            variant="outlined"
            value={formData.amount}
            onChange={handleChange}
          />
        </Grid>
        {rechargeData && rechargeData.status && (
          <Grid item xs={12}>
            <Alert 
              severity={rechargeData.status === 'FAILURE' ? 'error' : 'success'} 
              sx={{ mt: 2 }}
            >
              <strong>Status:</strong> {rechargeData.status} 
              {rechargeData.errorMessage && (
                <>
                  <br />
                  <strong>Message:</strong> {rechargeData.errorMessage}
                </>
              )}
            </Alert>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained">Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
    </Box>
    </Box>
  );
}
