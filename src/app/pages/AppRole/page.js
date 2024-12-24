"use client";

import { useState } from "react";
import { addAppRole } from "../../redux/AppRoleSlice";
import DisplayAppRole from "./DisplayAppRole";
import { TextField, Button } from "@mui/material";
import { fetchAppRole } from "../../redux/AppRoleSlice";
import { Box } from "@mui/material";
import styles from "./AppRole.module.css";

import { useDispatch } from "react-redux";

export default function AddAppRole() {
  const [roleName, setRoleName] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(addAppRole(roleName))
      .then(() => {
        dispatch(fetchAppRole());
        setRoleName("");
      })
      .catch((error) => {
        console.error("Error adding role: ", error);
      });
  };

  return (
    <Box className={styles.container}>
      <Box sx={{ width: "93%", margin: "20px auto", marginRight: "3rem" }}>
        <h3 style={{ color: "#333333" }}>Add AppRole</h3>
        <TextField
          placeholder="Add App  Role"
          onChange={(e) => setRoleName(e.target.value)}
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
          Add AppRole
        </Button>
        <br />
        <DisplayAppRole />
      </Box>
    </Box>
  );
}
