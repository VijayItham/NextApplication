"use client";

import { useEffect, useState } from "react";
import { addOperatorType } from "../../../redux/OperatorTypeSlice";
import DisplayOperatorType from "./DisplayOperatorType";
import { TextField, Button } from "@mui/material";
import { isLoggedIn } from "../../../api/auth";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

export default function AddOperatorType() {
  const [operatorTypeName, setOperatorTypeName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = () => {
    dispatch(addOperatorType(operatorTypeName));
  };

  return (
    <div>
        <div style={{ position: 'relative', minHeight: '200px' }}>
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
        </div>
      
    </div>
  );
}
