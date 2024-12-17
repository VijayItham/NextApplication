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
import { useDispatch } from "react-redux";
import { addFundRequest, updateFundRequest } from "@/app/redux/FundRequestSlice";
import { fetchFundRequest } from "@/app/redux/FundRequestSlice";

const paymentModeList = [{id:1,paymentMode:'Cash'},{id:2,paymentMode:'IMPS'},{id:3,paymentMode:'NEFT'},{id:4,paymentMode:'UPI/QR'}]

export default function AddFundRequest({
  setIsAddFundRequest,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    paymentMode: "",
    fromBank: "",
    toBank: "",
    fundAmount: "",
    referenceNo: "",
    paymentProf: "",
    remark: "",
  });
  const dispatch = useDispatch();
  // const { fundRequestData } = useSelector((data) => data.fundRequestReducer);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateFundRequest(formData));
      setMessage("Data Updated Succefully");
    } else {
     await dispatch(addFundRequest(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchFundRequest());
    setIsEdit(false);
    setIsAddFundRequest(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAddFundRequest(false);
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
        {isEdit ? "Update" : "Add"} Fund Request
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Payment Mode</InputLabel>
            <Select
              labelId="role-select-label"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {paymentModeList.map(({ id, paymentMode }) => (
                <MenuItem key={id} value={paymentMode}>
                  {paymentMode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="fromBank"
            label="From Bank"
            variant="outlined"
            value={formData.fromBank}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="toBank"
            label="To Bank"
            variant="outlined"
            value={formData.toBank}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="fundAmount"
            label="Fund Amount"
            variant="outlined"
            value={formData.fundAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="referenceNo"
            label="Reference No"
            variant="outlined"
            value={formData.referenceNo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="paymentProf"
            label="Payment Prof"
            variant="outlined"
            value={formData.paymentProf}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="remark"
            label="Remark"
            variant="outlined"
            value={formData.remark}
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
