"use client";

import { useState } from "react";
import { addOperatorType } from "../../redux/OperatorTypeSlice";
import DisplayOperatorType from "./DisplayOperatorType";
import { fetchOperatorType } from "../../redux/OperatorTypeSlice";
import { TextField, Button } from "@mui/material";
import styles from "./OperatorType.module.css"
import { Box } from "@mui/material";

import { useDispatch } from "react-redux";

export default function AddOperatorType() {
  const [operatorTypeName, setOperatorTypeName] = useState("");
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(addOperatorType(operatorTypeName))
    .then(() => {
      dispatch(fetchOperatorType())
    })
    .catch((error) => {
      console.error("Error adding role: ", error);
    });
  };

  return (

    <Box className={styles.container}>
      <Box sx={{ width: "93%", margin: "20px auto", marginRight: "3rem" }}>
        <h3>Add Operator Type</h3>
        <TextField
          placeholder="Add Operator Type"
          onChange={(e) => setOperatorTypeName(e.target.value)}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#784800",
              },
              "& input": {
                position: "relative",
                left: "1rem",
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
          Add Operator Type
        </Button>
        <br />
        <DisplayOperatorType />
      </Box>
    </Box>


  );
}
