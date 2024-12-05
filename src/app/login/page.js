"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "../redux/AppUserSlice";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const validateFields = () => {
    let tempErrors = {};
    if (!userName) tempErrors.userName = "User Name is required";
    if (!password) tempErrors.password = "Password is required";
    return tempErrors;
  };

  const onCancel= ()=>{
    router.push('/')
  }

  const handleLoginSignup = async (e) => {
    e.preventDefault();
    setApiError("");
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const result = await dispatch(
        fetchUserLogin({ userName, password })
      ).unwrap();
      setLoading(false);
      if (result && result.token) {
        router.push("/component/Dashboard");
      } else {
        setApiError("Invalid username or password.");
      }
    } catch (error) {
      setApiError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Centers the form vertically
    >
      <Box
        component="form"
        onSubmit={handleLoginSignup}
        sx={{
          width: '300px', // Controls the width of the form
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <TextField
          required
          label="User Name"
          name="name"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={!!errors.userName}
          helperText={errors.userName}
          size="small" // Makes the text box smaller
        />
        <TextField
          required
          label="Password"
          name="password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          size="small" // Makes the text box smaller
        />

        {apiError && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {apiError}
          </Typography>
        )}

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button color="primary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
