"use client";

import { useState } from "react";
import { updateAppRole } from "../redux/AppRoleSlice";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";

export default function EditAppRole({ data, setIsEdit, isEdit }) {
    const { appRoleId, roleName } = data
    const [updateRoleName, setUpdateRoleName] = useState(roleName);
     const dispatch = useDispatch();

    const handleEditSave = () => {
        dispatch(updateAppRole({appRoleId,roleName:updateRoleName}))
        setIsEdit(false)
    }

    return (
        <Dialog open={isEdit} onClose={() => setIsEdit(false)}>
            <DialogTitle>Edit App Role</DialogTitle>
            <DialogContent>
                    <TextField
                    label="Role Name" 
                        name="name"
                        fullWidth
                        margin="normal"
                        value={updateRoleName}
                        onChange={(e) => setUpdateRoleName(e.target.value)}
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