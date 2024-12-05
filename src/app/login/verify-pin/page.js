"use client";

import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import styles from "./verifypin.module.css";
import { verifyPin } from "../../redux/AppUserSlice";
import { useDispatch } from "react-redux";

export default function VerifyPin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleForgotPin = () => {
    router.push("/forgotPin");
  };

  // Verify the PIN
  const verifyPinCode = async (fullPin) => {
    try {
      setLoading(true);
      const result = await dispatch(
        verifyPin(fullPin ) 
      ).unwrap();
      console.log(result);

      if (result?.userDetails?.message === "Data Found") {
        router.push("/component/Dashboard");
        setTimeout(() => {
          enqueueSnackbar('Login successful!', {
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            style: { backgroundColor: "#4caf50", color: "#fff" },
          });
        }, 1000); 
        
      } else {
        enqueueSnackbar('Incorrect PIN. Please try again.', {
          variant: 'error',
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          style: { backgroundColor: "#f44336", color: "#fff" },
        });
      }
    } catch (err) {
      console.log("Error during PIN verification:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (event, index) => {
    const value = event.target.value;

    if (!/^\d$/.test(value) && value !== "") {
      return;
    }

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== "" && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullPin = pin.join("");

    if (fullPin.length < 4) {
      setError("Please enter a complete 4-digit PIN.");
      enqueueSnackbar('Please enter a complete 4-digit PIN.', { variant: 'warning' });
      return;
    }
    
    verifyPinCode(fullPin)
   
  };

 

  return (
    <Box className={styles.container}>
  
      <Box component="img" src="/images/boy.svg" alt="Boy Illustration" className={styles.leftImage} />


      <Box className={styles.verifycontainer}>
        <Box component="img" src="/images/Codetrex_logo.png" alt="Codetrex Logo" className={styles.codetrexlogo} />

        <Box className={styles.pininput}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <TextField
                key={index}
                aria-label={`PIN input ${index + 1}`}
                variant="outlined"
                value={pin[index]}
                onChange={(e) => handlePinChange(e, index)}
                id={`pin-input-${index}`}
                sx={{
                  backgroundColor: "#7848008A",
                  borderRadius: "10px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    width: "36px",
                    fontSize: "1.2rem",
                  },
                }}
              />
            ))}
        </Box>

        <Button variant="body2" className={styles.forgotpin} onClick={handleForgotPin}>
          Forgot PIN?
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          className={styles.verifypin}
          sx={{
            "&:hover": {
              backgroundColor: "#5e3700",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Verify PIN"}
        </Button>
      </Box>

      <Box component="img" src="/images/girl.svg" alt="Girl Illustration" className={styles.rightImg} />
    </Box>
  );
}
