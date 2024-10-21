"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRoleMenu,
  fetchRoleMenu,
  addRoleMenu,
} from "@/app/redux/RoleMenuSlice";
import { fetchAppRole } from "../redux/AppRoleSlice";
import { fetchMenu } from "../redux/MenuSlice";

export default function AddRoleMenu({
  setIsAdd,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    appRoleId: 0,
    menuId: 0,
  });

  const { appRoleData } = useSelector((data) => data.appRoleReducer);
  const { menuData } = useSelector((data) => data.menuReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppRole());
    if (isEdit) {
      dispatch(fetchMenu());
      setFormData(data);
    }
  }, []);

  const handleChange = async (e) => {
    if (e.target.name === "appRoleId") {
      dispatch(fetchMenu());
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateRoleMenu(formData));
      setMessage("Data Updated Succefully");
    } else {
      await dispatch(addRoleMenu(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchRoleMenu());
    setIsEdit(false);
    setIsAdd(false);
    setOpenSnackbar(true);
  };

  const onCancel = () => {
    setIsAdd(false);
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
        {isEdit ? "Update" : "Add"} Role Menu
      </Typography>

      {/* Both dropdowns in a single row */}
      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role Id</InputLabel>
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

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="menu-select-label">Menu Id</InputLabel>
            <Select
              labelId="menu-select-label"
              name="menuId"
              value={formData.menuId}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {menuData.map(({ menuId, menuName }) => (
                <MenuItem key={menuId} value={menuId}>
                  {menuName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained">
            {isEdit ? "Update" : "Assign"}
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
