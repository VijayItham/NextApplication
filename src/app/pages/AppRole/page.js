"use client";

import { useState } from "react";
import { addAppRole } from "../../redux/AppRoleSlice";
import DisplayAppRole from "./DisplayAppRole";
import { TextField, Button } from "@mui/material";
import {Box} from "@mui/material";
import styles from "./AppRole.module.css";

import { useDispatch } from "react-redux";

export default function AddAppRole() {
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(addAppRole(roleName));
  };

  return (
        <Box className={styles.container}>
           <Box sx={{ width:"93%", margin:"20px auto" , marginRight:"3rem"}}>
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
            className={styles.btn}
          >
            Add User
          </Button>
          <br />
          <DisplayAppRole />
          </Box>
        </Box>
  );
}