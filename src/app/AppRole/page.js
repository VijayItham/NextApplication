"use client";

import { useState } from "react";
import { addAppRole } from "../redux/AppRoleSlice";
import DisplayAppRole from './DisplayAppRole'
import { TextField, Button } from "@mui/material";

import { useDispatch } from "react-redux";

export default function AddAppRole() {
    const [roleName, setRoleName] = useState("");
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(addAppRole(roleName));
    };

    return (
        <div>
            <h3>Add Users</h3>
            <TextField
                placeholder="Add New Role"
                onChange={(e) => setRoleName(e.target.value)}
            />
            <Button onClick={onSubmit} color="primary" style={{ marginLeft: '20px', marginTop: '7px' }} variant="contained">
                Add User
            </Button>
            <br />
            <DisplayAppRole />
        </div>
    );
}