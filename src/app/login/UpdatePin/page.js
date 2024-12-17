"use client";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { updatePin } from "@/app/redux/AppUserSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import styles from "./UpdatePin.module.css";

export default function UpdatePin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoHome = () => {
    router.push("/");
  };

  const handlePin = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
    }
    if (value.length !== 4 && value.length > 0) {
      setError("PIN must be exactly 4 digits.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (pin.length > 0 && pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
    } else if (pin !== confirmPin && confirmPin.length > 0) {
      setError("PINs do not match.");
    } else {
      setError("");
    }
  }, [pin, confirmPin]);

  async function createPin() {
    try {
      setLoading(true);
      setError("");
      const result = await dispatch(updatePin(pin)).unwrap();

      if (result?.message === "Data Found") {
        router.push("/login/UpdatePinSuccess");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    createPin();
    setPin("");
    setConfirmPin("");
  };
  return (
    <>
      <Box className={styles.container}>
        <Box
          component="img"
          src="/images/boy.svg"
          alt="Boy Illustration"
          className={styles.leftImg}
        />

        <Box className={styles.box}>
          <Box className={styles.arrowBox} onClick={handleGoHome}>
            <ArrowBackIcon className={styles.arrowIcon} />
          </Box>

          <Box className={styles.content}>
            <Typography variant="h4" component="h3">
              Update Pin?
            </Typography>
            <Typography className={styles.description}>
              Enter your pin and confirm your pin
            </Typography>

            {error && <Typography className={styles.error}>{error}</Typography>}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="pin"
                placeholder="Pin"
                name="pin"
                autoFocus
                value={pin}
                onChange={handlePin}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6" component="span">
                        {"@"}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#784800",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPin"
                placeholder="Confirm Pin"
                id="confirmPin"
                autoComplete="current-password"
                value={confirmPin}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,4}$/.test(value)) {
                    setConfirmPin(value);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="h6" component="span">
                        {"@"}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1rem",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#784800",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                className={styles.submitbtn}
                disabled={loading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Right Image */}
        <Box
          component="img"
          src="/images/girl.svg"
          alt="Girl Illustration"
          className={styles.rightImg}
        />
      </Box>
    </>
  );
}
