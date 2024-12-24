"use client";

import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addNews, fetchAllNews, updateNews } from "@/app/redux/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./News.module.css";

export default function AddNews({
  setIsAddNews,
  isEdit,
  setIsEdit,
  setMessage,
  setOpenSnackbar,
  data,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    newsType: "",
    description: "",
  });

  const { newsData } = useSelector((state) => state?.newsReducer);

  useEffect(() => {
    if (isEdit) {
      setFormData(data);
    }
  }, [data, isEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await dispatch(updateNews(formData));
        setMessage("Data Updated Successfully");
      } else {
        await dispatch(addNews(formData));
        setMessage("Data Saved Successfully");
      }
      dispatch(fetchAllNews());
      setIsEdit(false);
      setIsAddNews(false);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting news: ", error);
    }
  };

  const onCancel = () => {
    setIsAddNews(false);
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
        {isEdit ? "Update" : "Add"} News
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="news-type-label">News Type</InputLabel>
            <Select
              labelId="news-type-label"
              name="newsType"
              value={formData.newsType}
              onChange={handleChange}
              variant="outlined"
              required
            >
              {newsData?.map(({ newsId, newsType }) => (
                <MenuItem key={newsId} value={newsType}>
                  {newsType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="title"
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            required
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 3 }}>
        <Grid item>
          <Button type="submit" variant="contained" className={styles.btn}>
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={onCancel}
            variant="outlined"
            className={styles.btn}
            style={{ color: "white" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
