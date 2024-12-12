"use client";

import { useState } from "react";
import { addOperatorType } from "../../redux/OperatorTypeSlice";
import DisplayOperatorType from "./DisplayOperatorType";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./OperatorType.module.css"
import {Box} from "@mui/material";

import { useDispatch } from "react-redux";

export default function AddOperatorType() {
  const [operatorTypeName, setOperatorTypeName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = () => {
    dispatch(addOperatorType(operatorTypeName));
  };

  return (
  
        <Box className = {styles.container}>
              <Box sx={{ width:"93%", margin:"20px auto" , marginRight:"3rem"}}>
          <h3>Add Operator</h3>
          <TextField
            placeholder="Add Operator"
            onChange={(e) => setOperatorTypeName(e.target.value)}
            required
          />
          <Button
            onClick={onSubmit}
            color="primary"
            style={{ marginLeft: "20px", marginTop: "7px" }}
            variant="contained"
          >
            Add Operator
          </Button>
          <br />
          <DisplayOperatorType />
          </Box>
        </Box>
      
  
  );
}
