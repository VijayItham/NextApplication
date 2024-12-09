"use client";

import { useDispatch} from "react-redux";
import { useState } from "react"; 
import { addWallet } from "../../redux/WalletSlice"; 
import { TextField, Button } from "@mui/material"; 
import DisplayWallet from "./DisplayWallet";

export default function ShowWallet() {
  const [walletName, setWalletName] = useState(""); 
  
  const dispatch = useDispatch();
  
  const onSubmit = () => {
    dispatch(addWallet(walletName));
  };

  return (
    <div>
      <div style={{ position: "relative", minHeight: "200px" }}>
        <h3>Add Wallet</h3>
        <TextField
          placeholder="Add Wallet"
          value={walletName} 
          onChange={(e) => setWalletName(e.target.value)}
          required
        />
        <Button
          onClick={onSubmit}
          color="primary"
          style={{ marginLeft: "20px", marginTop: "7px" }}
          variant="contained"
        >
          Add Wallet
        </Button>
        <br />
        <DisplayWallet/>
      </div>
    </div>
  );
}
