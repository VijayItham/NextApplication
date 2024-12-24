"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  newsData: [],
};

export const fetchAllNews = createAsyncThunk("fetchAllNews", async () => {
  const response = await getRequest("/News/getAllNews");
  return response.data;
});

export const addNews = createAsyncThunk("addNews", async (formData) => {
  const response = await postCreate("/News/addNews", formData);
  return response.data;
});

export const updateNews = createAsyncThunk("updateNews", async (data) => {
  return await postUpdate("/News/updateNews", data);
});

export const deleteNews = createAsyncThunk("deleteNews", async (newsId) => {
  return await postUpdate("/News/deleteNews", newsId);
});

const AppNewsSlice = createSlice({
  name: "appNewsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        (state.isLoading = false), (state.newsData = action.payload);
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          state.newsData = action.payload;
        }
      })
      .addCase(addNews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
        }
      })
      .addCase(updateNews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { newsId } = action.meta.arg;
          state.newsData = state.newsData.filter(
            (item) => item.newsId !== newsId
          );
        }
      })
      .addCase(deleteNews.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AppNewsSlice.reducer;
