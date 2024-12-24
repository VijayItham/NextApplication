"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { addWallet } from "@/app/redux/WalletSlice";
import { TextField, Button } from "@mui/material";
import DisplayWallet from "./DisplayWallet";
import styles from "./Wallet.module.css";
import { fetchAllWallets } from "@/app/redux/WalletSlice";

export default function ShowWallet() {
  const [walletName, setWalletName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      await dispatch(addWallet(walletName));
      dispatch(fetchAllWallets());
      setWalletName("");
    } catch (error) {
      console.error("Error adding wallet: ", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        left: "19rem",
        top: "5rem",
        width: "81vw",
      }}
    >
      <div style={{ position: "relative", minHeight: "200px" }}>
        <h3 style={{ color: "#333333" }}>Add Wallet</h3>
        <TextField
          placeholder="Add Wallet"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#784800",
              },
              "& input": {
                position: "relative",
                left: "2rem",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#666666",
            },
          }}
        />

        <Button
          onClick={onSubmit}
          color="primary"
          style={{ marginLeft: "20px" }}
          variant="contained"
          className={styles.btn}
        >
          Add Wallet
        </Button>
        <br />
        <DisplayWallet />
      </div>
    </div>
  );
}
