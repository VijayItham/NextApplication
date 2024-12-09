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
import { fetchAppRole } from "@/app/redux/AppRoleSlice";
import {
  fetchCountry,
  fetchState,
  fetchCity,
} from "@/app/redux/CountryStateCitySlice";
import { addAppUser, updateAppUser } from "@/app/redux/AppUserSlice";
import { fetchAppUser } from "@/app/redux/AppUserSlice";

export default function AddAppUser({
  setIsAddUser,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address1: "",
    zipCode: "",
    panNumber: "",
    aadharNumber: "",
    aadharImageFront: "",
    appRoleId: "",
    countryId: "",
    stateId: "",
    cityId: "",
  });
  const dispatch = useDispatch();
  const { appRoleData } = useSelector((data) => data.appRoleReducer);
  const { countryList, stateList, cityList } = useSelector(
    (data) => data.countryStateCityReducer
  );
  useEffect(() => {
    dispatch(fetchAppRole());
    dispatch(fetchCountry());
    if (isEdit) {
      const { countryId, stateId } = data;
      setFormData(data);
      dispatch(fetchState(countryId));
      dispatch(fetchCity(stateId));
    }
  }, []);
  
  const handleChange = async (e) => {
    if (e.target.name === "aadharImageFront") {
      const imagePath = e.target.files?.[0];
      const data = new FormData();
      data.set("file", imagePath);
      setFormData({ ...formData, aadharImageFront: imagePath.name });
      const result = await fetch("api/upload", {
        method: "POST",
        body: data,
      });
    }
    if (e.target.name === "countryId") {
      dispatch(fetchState(e.target.value));
    }
    if (e.target.name === "stateId") {
      dispatch(fetchCity(e.target.value));
    }
    if (e.target.name !== "aadharImageFront") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
        await dispatch(updateAppUser(formData));
        setMessage("Data Updated Succefully");
    } else {
        await dispatch(addAppUser(formData));
        setMessage("Data Save Succefully");
    }
    dispatch(fetchAppUser());
    setIsEdit(false);
    setIsAddUser(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAddUser(false);
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
        {isEdit ? "Update" : "Add"} User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="userName"
            label="User Name"
            variant="outlined"
            value={formData.userName}
            onChange={handleChange}
            disabled={isEdit}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role Name</InputLabel>
            <Select
              labelId="role-select-label"
              name="appRoleId"
              value={formData.appRoleId}
              onChange={handleChange}
              variant="outlined"
              required
              disabled={isEdit}
            >
              {appRoleData.map(({ appRoleId, roleName }) => (
                <MenuItem key={appRoleId} value={appRoleId}>
                  {roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="firstName"
            label="First Name"
            variant="outlined"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            variant="outlined"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="address1"
            label="Address Line 1"
            variant="outlined"
            value={formData.address1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Country</InputLabel>
            <Select
              labelId="role-select-label"
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {countryList.map(({ cid, countryName }) => (
                <MenuItem key={cid} value={cid}>
                  {countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">State</InputLabel>
            <Select
              labelId="role-select-label"
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {stateList.map(({ sid, stateName }) => (
                <MenuItem key={sid} value={sid}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">City</InputLabel>
            <Select
              labelId="role-select-label"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {cityList.map(({ ctid, cityName }) => (
                <MenuItem key={ctid} value={ctid}>
                  {cityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="zipCode"
            label="Zip Code"
            variant="outlined"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="panNumber"
            label="PAN Number"
            variant="outlined"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="aadharNumber"
            label="Aadhar Number"
            variant="outlined"
            value={formData.aadharNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="aadharImageFront"
            label="Upload Aadhar Image"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
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
