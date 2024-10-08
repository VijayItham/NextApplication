"use client";

import { useState } from "react";
import { addUser } from "../redux/slice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function AddUsers() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(addUser(name));
        console.log('name:', name); // Corrected the console.log syntax
    };

    return (
        <div>
            <h3>Add Users</h3>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Add New User" />
            <button onClick={onSubmit}>Add User</button>
            <Link href="/removeuser">Remove User</Link><br></br>
            <Link href="/apiUsers">API USERS</Link>
        </div>
    );
}