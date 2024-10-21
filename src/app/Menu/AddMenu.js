"use client";

import { useEffect, useState } from "react";
import { TextField, Box, Typography, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateMenu, addMenu, fetchMenu } from "../redux/MenuSlice";

export default function AddMenu({
  setIsAdd,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const [formData, setFormData] = useState({
    menuName: "",
    pageName: "",
    controllerName: "",
    actionName: "",
    displayOrder: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      const { countryId, stateId } = data;
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
      await dispatch(updateMenu(formData));
      setMessage("Data Updated Succefully");
    } else {
      await dispatch(addMenu(formData));
      setMessage("Data Save Succefully");
    }
    dispatch(fetchMenu());
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
        {isEdit ? "Update" : "Add"} Menu
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="menuName"
            label="Menu Name"
            variant="outlined"
            value={formData.menuName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="pageName"
            label="Page Name"
            variant="outlined"
            value={formData.pageName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="controllerName"
            label="Controller Name"
            variant="outlined"
            value={formData.controllerName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="actionName"
            label="Action Name"
            variant="outlined"
            value={formData.actionName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="displayOrder"
            label="Display Order"
            variant="outlined"
            value={formData.displayOrder}
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
