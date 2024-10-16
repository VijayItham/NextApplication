"use client";

import { useState } from "react";
//import { updateAppUser } from "../../redux/AppUserSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";

export default function EditAppUser({ data, setIsEdit, isEdit }) {
    const { appUserId, UserName } = data
    const [updateUserName, setUpdateUserName] = useState(UserName);
     const dispatch = useDispatch();

    const handleEditSave = () => {
        dispatch(updateAppUser({appUserId,UserName:updateUserName}))
        setIsEdit(false)
    }

    return (
        <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
            <DialogTitle>Edit App User</DialogTitle>
            <DialogContent>
                    <TextField
                    label="User Name" 
                        name="name"
                        fullWidth
                        margin="normal"
                        value={updateUserName}
                        onChange={(e) => setUpdateUserName(e.target.value)}
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