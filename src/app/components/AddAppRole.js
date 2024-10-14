"use client";

import { useState } from "react";
import { addAppRole } from "../redux/AppRoleSlice";

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
            <input type="text" onChange={(e) => setRoleName(e.target.value)} placeholder="Add New Role" />
            <button onClick={onSubmit}>Add User</button>
        </div>
    );
}