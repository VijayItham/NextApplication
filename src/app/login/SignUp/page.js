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
import { brown } from '@mui/material/colors';
import {
  fetchCountry,
  fetchState,
  fetchCity,
} from "@/app/redux/CountryStateCitySlice";
import { addAppUser } from "@/app/redux/AppUserSlice";
import { useRouter } from "next/navigation";
import styles from "./SignUp.module.css";
import { useSnackbar } from "notistack";
import { orderBy } from "lodash";

export default function SignUp({ setMessage, setOpenSnackbar }) {
  const enqueueSnackbar = useSnackbar();
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    middleName: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    zipCode: "",
    panNumber: "",
    aadharNumber: "",
    panImage: "",
    aadharImageFront: "",
    aadharImageBack: "",
    countryId: "96",
    stateId: "",
    cityId: "",
    createdBy: "F931AD04-9E49-4B84-9DE4-7968BB1F26F0",
    // businessName: "",
    // businessAddress: "",
    // businessCountryId: "96",
    // businessStateId: "",
    // businessCityId: "",
    // businessZip: "",
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

    const appRoleId = "F931AD04-9E49-4B84-9DE4-7968BB1F26F0";

    const finalFormData = {
      ...formData,
      appRoleId,
    };

    try {
      await dispatch(addAppUser(finalFormData)).unwrap();
      setFormData({
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        middleName: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        zipCode: "",
        panNumber: "",
        aadharNumber: "",
        panImage: "",
        aadharImageFront: "",
        aadharImageBack: "",
        countryId: "96",
        stateId: "",
        cityId: "",
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };


  const handleLogin = () => {
    router.push('/')
  };

  const inputStyles = {
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#784800",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  };

  return (
    <Box className={styles.container}>
      <Box
        component="form"
        onSubmit={onSubmit}
        className={styles.box}
      >
        <Box
          className={styles.content}
        >
          <Typography variant="h5" mb={4} className={styles.title}>
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
                placeholder="UserName "
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.userName}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                required
                name="firstName"
                label="First Name"
                placeholder="First Name"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.firstName}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.lastName}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                required
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.password}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                required
                name="email"
                label="Email"
                type="email"
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                required
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Phone No"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.phoneNumber}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}

                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                required
                name="address1"
                label="Address"
                placeholder="Address"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.address1}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth >
                <InputLabel id="country-select-label" >
                  Country
                </InputLabel>
                <Select
                  labelId="country-select-label"
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  sx={{ border: "brown" }}
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
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.zipCode}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Grid>

            {/* Business Details */}
            {/* <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mt={2} className={styles.title}>
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
                    sx={{
                      color: brown[800],
                      "&.Mui-checked": {
                        color: brown[600],
                      },
                    }}
                  />
                }
                label="Is business the same as member address?"
                sx={{ color: "#333333;", gap: 0.5 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="businessName"
                label="Business Name"
                placeholder="Business Name"
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.businessName}
                onChange={handleChange}
                required
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="businessAddress"
                label="Business Address"
                placeholder="Businness Address"
                value={formData.businessAddress}
                onChange={handleChange}
                required
                sx={inputStyles}
                InputLabelProps={{
                  shrink: true
                }}
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
                InputLabelProps={{
                  shrink: true
                }}
                value={formData.businessZip}
                onChange={handleChange}
                required
                sx={inputStyles}
              />
            </Grid> */}
          </Grid>
          <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <Button type="submit" variant="contained" className={styles.button}>
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleLogin} variant="outlined" className={styles.button}>
                Login Now
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
