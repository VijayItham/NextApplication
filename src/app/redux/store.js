"use client"

import { configureStore } from "@reduxjs/toolkit";
import appRoleReducer from "./AppRoleSlice";
import countryStateCityReducer from "./CountryStateCitySlice";
import appUserReducer from "./AppUserSlice"; // Ensure this is correct
import menuReducer from "./MenuSlice";
import roleMenuReducer from "./RoleMenuSlice";
import fundRequestReducer from "./FundRequestSlice";
import operatorTypeReducer from "./OperatorTypeSlice";
import newsReducer from "./NewsSlice"
import operatorReducer from "./OperatorSlice";
import operatorCommissionReducer from "./OperatorCommissionSlice";
import amountTypeReducer from "./AmountTypeSlice";
import userCommissionReducer from "./UserCommissionSlice";
import rechargeReducer from "./RechargeSlice";
import userWalletSummaryReducer from "./UserWalletSummarySlice";
import walletReducer from "./WalletSlice";


const store = configureStore({
  reducer: {
    appRoleReducer,
    operatorTypeReducer,
    countryStateCityReducer,
    appUserReducer,
    menuReducer,
    roleMenuReducer,
    fundRequestReducer,
    operatorReducer,
    operatorCommissionReducer,
    amountTypeReducer,
    userCommissionReducer,
    newsReducer,
    rechargeReducer,
    userWalletSummaryReducer,
    walletReducer
  },
});

export default store;
