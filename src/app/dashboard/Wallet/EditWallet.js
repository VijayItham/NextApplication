"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { updateWallet } from "../../redux/WalletSlice";

export default function UpdateWallet({data, setIsEdit, isEdit}) {
  const{walletId, walletName} = data
  const [updateWalletName, setUpdateWalletName] = useState(walletName);
  const dispatch = useDispatch();

  const handleEditSave = () => {
    dispatch(updateWallet({walletId,walletName:updateWalletName}));
    setIsEdit(false)
}

  return (
    <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
            <DialogTitle>Edit App Wallet</DialogTitle>
            <DialogContent>
                    <TextField
                    label="Role Name" 
                        name="name"
                        fullWidth
                        margin="normal"
                        value={updateWalletName}
                        onChange={(e) => setUpdateWalletName(e.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsEdit(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEditSave} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
  );
}
