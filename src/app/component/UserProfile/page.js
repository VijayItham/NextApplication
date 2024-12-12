
"use client"
import * as React from 'react';
import { Box } from "@mui/material";
import styles from "./UserProfile.module.css";
import { useState } from "react";
import { Typography, Grid, TextField, Button, CircularProgress } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputAdornment from "@mui/material/InputAdornment";
import { getUserDetails } from '@/app/api/auth';
import { updatePassword } from '@/app/redux/AppUserSlice';
import { useSnackbar } from "notistack";
import { useDispatch } from 'react-redux';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('1');
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const details = getUserDetails();
  const username = details.userName;

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

  const handleTabList = (event, newValue) => {
    setValue(newValue);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleOldPassword = (e) =>{
    setOldPassword(e.target.value);
  }

  const handleConfirmPassword = (e) =>{
    setConfirmPassword(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("new Passwords do not match.", {
        variant: "error",
        autoHideDuration: 1000,
        style: { backgroundColor: "#f44336", color: "#fff" },
      });

      setPassword("");
      setConfirmPassword("");
      return;
    }

    setLoading(true);

    if (oldPassword !== details.password) {
      enqueueSnackbar("old password is not correct", {
        variant: "success",
        autoHideDuration: 1000,
        style: { backgroundColor: "#f4436", color: "#fff" },
      });
    } else {
      try {
        await dispatch(updatePassword({ username, password })).unwrap()

        enqueueSnackbar("Pasword Updated successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          style: { backgroundColor: "#4caf50", color: "#fff" },
        });
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error updating password: ", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Box className={styles.container}>
      <TabContext value={value}>
        <Box className={styles.tabBox}>
          <TabList onChange={handleTabList} sx={{
            width: "43vw", "& .MuiTabs-indicator": {
              display: "none",
            },
          }}>
            <Tab label="User Details" value="1" sx={{
              "&.Mui-selected": {
                color: "#784800",
                borderBottom: "1px solid #784800"
              },
            }} />
            <Tab label="Update Password" value="2" sx={{
              marginLeft: "10rem", "&.Mui-selected": {
                color: "#784800",
                borderBottom: "1px solid #784800"
              },
            }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ marginTop: "4rem", width: "33vw", marginLeft: "7.5rem" }}>
            <Box
              className={styles.content}
            >
              <Typography variant="h5" mb={4} className={styles.title}>
                UserDetails
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">User Name:</Typography>
                    <Typography variant="body1">{details.userName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">First Name:</Typography>
                    <Typography variant="body1">{details.firstName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Last Name:</Typography>
                    <Typography variant="body1">{details.lastName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Password:</Typography>
                    <Typography variant="body1">{details.password}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                    <Typography variant="body1">{details.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Phone Number:</Typography>
                    <Typography variant="body1">{details.phoneNumber}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
                    <Typography variant="body1">{details.address1}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Country:</Typography>
                    <Typography variant="body1">{details.countryName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">State:</Typography>
                    <Typography variant="body1">{details.stateName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">City:</Typography>
                    <Typography variant="body1">{details.cityName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={styles.columnStyles}>
                    <Typography variant="subtitle1" fontWeight="bold">Zip Code:</Typography>
                    <Typography variant="body1">{details.zipCode}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box className={styles.box}>
            <Box
              Sx={{ marginTop: "7rem", width: "40vw", height: "90vh", }}
            >
              <Box className={styles.content1}>
                <Typography variant="h4" component="h3" className={styles.title}>
                  Update Password ?
                </Typography>
                <Typography className={styles.description} >
                  Create your new password
                </Typography>
                <Box sx={{ mt: 1 }} >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Old password"
                    placeholder="Old Password"
                    name="password"
                    className={styles.textField}
                    autoFocus
                    value={oldPassword}
                    onChange={handleOldPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="h6" component="span">
                            {"@"}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyles}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    className={styles.textField}
                    placeholder="New Password"
                    id="newPassword"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="h6" component="span">
                            {"@"}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyles}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Confirm newPassword"
                    className={styles.textField}
                    placeholder="Confirm New Password"
                    id="confirm newPassword"
                    autoComplete="Confirm new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="h6" component="span">
                            {"@"}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyles}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    onClick={handleSubmit}
                    className={styles.submitBtn}
                  >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

