"use client";

import { useEffect, useState } from "react";
import { addAppRole } from "../../redux/AppRoleSlice";
import DisplayAppRole from "./DisplayAppRole";
import { TextField, Button } from "@mui/material";
import { isLoggedIn } from "../../common/auth";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

export default function AddAppRole() {
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = () => {
    dispatch(addAppRole(roleName));
  };

  return (
    <div>
        <div style={{ position: 'relative', minHeight: '200px' }}>
          <h3>Add Users</h3>
          <TextField
            placeholder="Add New Role"
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
          <Button
            onClick={onSubmit}
            color="primary"
            style={{ marginLeft: "20px", marginTop: "7px" }}
            variant="contained"
          >
            Add User
          </Button>
          <br />
          <DisplayAppRole />
        </div>
      
    </div>
  );
}
