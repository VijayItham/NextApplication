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
import { verifyUserName } from "@/app/redux/AppUserSlice";
import {
  fetchCountry,
  fetchState,
  fetchCity,
} from "@/app/redux/CountryStateCitySlice";
import { addAppUser } from "@/app/redux/AppUserSlice";
import { useRouter } from "next/navigation";
import styles from "./SignUp.module.css";
import { useSnackbar } from "notistack";

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const { appRoleData } = useSelector((data) => data?.appRoleReducer);

  const [validationErrors, setValidationErrors] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
  });

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
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { countryList, stateList, cityList } = useSelector(
    (data) => data.countryStateCityReducer
  );

  const result = useSelector((state) => state?.appUserReducer?.addAppUserData);

  useEffect(() => {
    if (result?.statusCode === 200) {
      enqueueSnackbar("Data saved successfully.", {
        variant: "success",
        autoHideDuration: 1000,
        style: { backgroundColor: "#4caf50", color: "#fff" },
      });
    } else if (result?.statusCode === 417) {
      enqueueSnackbar("User already exists.", {
        variant: "error",
        autoHideDuration: 1000,
        style: { backgroundColor: "#e57373", color: "#fff" },
      });
    }
  }, [result, enqueueSnackbar]);

  useEffect(() => {
    dispatch(fetchAppRole());
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "userName" || name === "email" || name === "phoneNumber") {
      const verificationResponse = await dispatch(
        verifyUserName({
          username: name === "userName" ? value : formData.userName,
          email: name === "email" ? value : formData.email,
          phoneNumber: name === "phoneNumber" ? value : formData.phoneNumber,
        })
      );

      setValidationErrors({
        userName: verificationResponse?.payload?.usernameVerified === false,
        email: verificationResponse?.payload?.emailVerified === false,
        phoneNumber:
          verificationResponse?.payload?.phoneNumberVerified === false,
      });
    }
    if (name === "countryId") {
      dispatch(fetchState(value));
    } else if (name === "stateId") {
      dispatch(fetchCity(value));
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
        createdBy: "F931AD04-9E49-4B84-9DE4-7968BB1F26F0",
      });
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleLogin = () => {
    router.push("/");
  };

  const inputStyles = {
    marginBottom: "1rem",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#784800",
      },

      "&.Mui-error": {
        borderColor: "red",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  };

  return (
    <>
      <Box className={styles.container}>
        <Box
          component="img"
          src="/images/boy.svg"
          alt="Boy-img"
          className={styles.leftImage}
        />
        <Box component="form" onSubmit={onSubmit} className={styles.box}>
          <Box className={styles.content}>
            <Typography variant="h5" mb={4} className={styles.title}>
              Sign Up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  name="userName"
                  label="User Name"
                  placeholder="UserName"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.userName}
                  onChange={handleChange}
                  error={validationErrors.userName}
                  helperText={
                    validationErrors.userName ? "Username already exists." : ""
                  }
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
                    shrink: true,
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
                    shrink: true,
                  }}
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={inputStyles}
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
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  InputLabelProps={{
                    shrink: true,
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
                    shrink: true,
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
                    shrink: true,
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
                    shrink: true,
                  }}
                  value={formData.address1}
                  onChange={handleChange}
                  sx={inputStyles}
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
                    shrink: true,
                  }}
                  value={formData.zipCode}
                  onChange={handleChange}
                  sx={inputStyles}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              sx={{ mt: 3 }}
              className={styles.groupBtn}
            >
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.button}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleLogin}
                  variant="outlined"
                  className={styles.button}
                >
                  Login Now
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          component="img"
          src="/images/girl.svg"
          alt="Girl Illustration"
          className={styles.rightImage}
        />
      </Box>
    </>
  );
}
