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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppRole } from "@/app/redux/AppRoleSlice";
import {
  fetchCountry,
  fetchState,
  fetchCity,
} from "@/app/redux/CountryStateCitySlice";
import { addAppUser } from "@/app/redux/AppUserSlice";
import { useRouter } from "next/navigation";

export default function SignUp({ setMessage, setOpenSnackbar }) {
  console.log(setMessage);
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
    businessName: "",
    businessAddress: "",
    businessCountryId: "",
    businessStateId: "",
    businessCityId: "",
    businessZip: "",
  });

  const [isBusinessSameAsUser, setIsBusinessSameAsUser] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { countryList, stateList, cityList } = useSelector(
    (data) => data.countryStateCityReducer
  );

  useEffect(() => {
    dispatch(fetchAppRole());
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setIsBusinessSameAsUser(checked);

      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          businessName: prevData.firstName,
          businessAddress: prevData.address1,
          businessCountryId: prevData.countryId,
          businessStateId: prevData.stateId,
          businessCityId: prevData.cityId,
          businessZip: prevData.zipCode,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          businessName: "",
          businessAddress: "",
          businessCountryId: "",
          businessStateId: "",
          businessCityId: "",
          businessZip: "",
        }));
      }
    } else {
      // Update other form fields
      if (name === "countryId") {
        dispatch(fetchState(value));
      }
      if (name === "stateId") {
        dispatch(fetchCity(value));
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addAppUser(formData));
    setMessage("Data Save Successfully");
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    router.push('/')
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
          boxShadow: 3, borderRadius: 2,
          width: "100%", 
          maxWidth: "1000px",
        }}
      >
        <Typography variant="h5" mb={2}>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          {/* User Details */}
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
              inputProps={{
                pattern: "[0-9]*",
                inputMode: "numeric", 
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              name="address1"
              label="Address"
              variant="outlined"
              value={formData.address1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
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
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
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
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
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

          {/* Separation and Business Details */}
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              Business Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBusinessSameAsUser}
                  onChange={handleChange}
                  name="isBusinessSameAsUser"
                />
              }
              label="Is business the same as member address?"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name="businessName"
              label="Business Name"
              variant="outlined"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name="businessAddress"
              label="Business Address"
              variant="outlined"
              value={formData.businessAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="business-country-select-label">
                Business Country
              </InputLabel>
              <Select
                labelId="business-country-select-label"
                name="businessCountryId"
                value={formData.businessCountryId}
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
              <InputLabel id="business-state-select-label">Business State</InputLabel>
              <Select
                labelId="business-state-select-label"
                name="businessStateId"
                value={formData.businessStateId}
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
              <InputLabel id="business-city-select-label">Business City</InputLabel>
              <Select
                labelId="business-city-select-label"
                name="businessCityId"
                value={formData.businessCityId}
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
              name="businessZip"
              label="Business Zip"
              variant="outlined"
              value={formData.businessZip}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
