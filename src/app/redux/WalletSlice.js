import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../common/api";


const initialState = {
  isLoading: false,
  wallets: [],
};

export const fetchAllWallets = createAsyncThunk("fetchAllWallets", async () => {

  const response = await getRequest("/Wallet/getAllWallet");
  return response.data;

});

export const fetchWalletById = createAsyncThunk("fetchWalletById", async (walletId) => {

  const response = await getRequest(`/Wallet/getByIdWallet/${walletId}`);
  return response.data;
});

export const addWallet = createAsyncThunk("addWallet", async (walletData) => {
  const data = {
    walletName: walletData,
    createdBy: user?.appUserId ?? null,
  };

  const response = await postCreate("/Wallet/addWallet", data);
  return response.data;
});

export const updateWallet = createAsyncThunk("updateWallet", async (walletData) => {

  const response = await axios.post("/Wallet/updateWallet", walletData);
  return response.data;
});

export const deleteWallet = createAsyncThunk("deleteWallet", async (walletId) => {

  const response = await postCreate("/Wallet/deleteWallet", walletId);
  return response.data;
});


const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // Fetch All Wallets
      .addCase(fetchAllWallets.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchAllWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload.data;
      })

      .addCase(fetchAllWallets.rejected, (state, action) => {
        state.isLoading = false;
      })

      //   fetchWalletbyid 
      .addCase(fetchWalletById.pending, (state) => {
        state.isLoading = true;
        state.selectedWallet = null;
      })

      .addCase(fetchWalletById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedWallet = action.payload;
      })

      .addCase(fetchWalletById.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Add Wallet
      .addCase(addWallet.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addWallet.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { id, walletName } = action.payload.data;
          state.wallets.push({ walletId: id, walletName });
        }
      })

      .addCase(addWallet.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Update Wallet
      .addCase(updateWallet.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateWallet.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { walletId, walletName } = action.meta.arg;

          const walletData = current(state.wallets);
          console.log(walletData)
          const updatedData = walletData.map((item) =>
            item.walletId === walletId ? { walletId, walletName } : item
          );
          console.log('updatedData111', updatedData)
          state.wallets = updatedData;
        }
      })

      .addCase(updateWallet.rejected, (state, action) => {
        state.isLoading = false;
      })

      // Delete Wallet
      .addCase(deleteWallet.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteWallet.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { walletId, walletName } = action.meta.arg;

          const walletData = current(state.wallets);
          console.log(walletData)
          const filteredData = walletData.filter(
            (item) => item.walletId != walletId
          );
          state.wallets = filteredData;
        }
      })

      .addCase(deleteWallet.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});


export default walletSlice.reducer;

