import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  wallets: [],
};

export const fetchAllWallets = createAsyncThunk("fetchAllWallets", async () => {
  return await getRequest("/Wallet/getAllWallet");
});

export const fetchWalletById = createAsyncThunk(
  "fetchWalletById",
  async (walletId) => {
    return await getRequest(`/Wallet/getByIdWallet/${walletId}`);
  }
);

export const addWallet = createAsyncThunk("addWallet", async (walletData) => {
  const data = {
    walletName: walletData,
  };

  return await postCreate("/Wallet/addWallet", data);
});

export const updateWallet = createAsyncThunk(
  "updateWallet",
  async (walletData) => {
    return await postCreate("/Wallet/updateWallet", walletData);
  }
);

export const deleteWallet = createAsyncThunk(
  "deleteWallet",
  async (walletId) => {
    return await postCreate("/Wallet/deleteWallet", walletId);
  }
);

const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWallets.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchAllWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload.data;
      })

      .addCase(fetchAllWallets.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchWalletById.pending, (state) => {
        state.isLoading = true;
        state.selectedWallet = null;
      })

      .addCase(fetchWalletById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedWallet = action.payload;
      })

      .addCase(fetchWalletById.rejected, (state) => {
        state.isLoading = false;
      })

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

      .addCase(addWallet.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateWallet.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateWallet.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { walletId, walletName } = action.meta.arg;

          const walletData = current(state.wallets);
          const updatedData = walletData.map((item) =>
            item.walletId === walletId ? { walletId, walletName } : item
          );
          state.wallets = updatedData;
        }
      })

      .addCase(updateWallet.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteWallet.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteWallet.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { walletId } = action.meta.arg;

          const walletData = current(state.wallets);
          const filteredData = walletData.filter(
            (item) => item.walletId != walletId
          );
          state.wallets = filteredData;
        }
      })

      .addCase(deleteWallet.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default walletSlice.reducer;
