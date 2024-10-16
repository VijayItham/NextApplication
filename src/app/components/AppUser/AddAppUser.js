"use client";

import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppRole } from "@/app/redux/AppRoleSlice";
import { fetchCountry, fetchState, fetchCity } from "@/app/redux/CountryStateCitySlice";

export default function AddAppUser() {
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
        aadharImage: "",
    });
    //const [aadharImage, setAadharImage] = useState(null)
    const dispatch = useDispatch();
    const { appRoleData } = useSelector((data) => data.appRoleReducer)
    const { countryList, stateList, cityList } = useSelector((data) => data.countryStateCityReducer)

    useEffect(() => {
        dispatch(fetchAppRole())
        dispatch(fetchCountry())
    }, [])

    const handleChange = async (e) => {
        console.log('eeeee', e)
        if (e.target.name === 'aadharImageFront') {
            const imagePath = e.target.files?.[0]
            console.log('imagePath', imagePath)
            const data = new FormData();
            data.set('file', imagePath);
            setFormData({ ...formData, aadharImage: imagePath.name })
            const result = await fetch("api/upload", {
                method: "POST",
                body: data
            });
        }
        if (e.target.name === 'country') {
            dispatch(fetchState(e.target.value))
        }
        if (e.target.name === 'state') {
            dispatch(fetchCity(e.target.value))
        }
        if (e.target.name !== 'aadharImageFront') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    // console.log('adharImage', aadharImage)
    console.log('formDataOuter==>', formData)
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('formData==>', formData)
        //dispatch(addAppUser(formData));
    };
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                maxHeight: "90vh", // Limits form height
                overflowY: "auto", // Adds internal scrolling if necessary
                p: 3,
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: 2,
                width: "100%",
                maxWidth: "1000px", // Set max width
            }}
        >
            <Typography variant="h5" mb={2}>Add User</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        //required
                        name="userName"
                        label="User Name"
                        variant="outlined"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth >
                        <InputLabel id="role-select-label">Role Name</InputLabel>
                        <Select
                            labelId="role-select-label"
                            name="role"
                            value={formData.appRoleId}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            {appRoleData.map(({ appRoleId, roleName }) => (
                                <MenuItem key={appRoleId} value={appRoleId}> {/* Replace role.name with the actual field from your API */}
                                    {roleName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        //required
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
                        //required
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
                        //required
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
                        //required
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
                        //required
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
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            variant="outlined"
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
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            variant="outlined"
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
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            variant="outlined"
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
                        inputProps={{ accept: "image/*" }} // Accept image files only
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true, // Keep label above the input
                        }}
                    />
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
}
