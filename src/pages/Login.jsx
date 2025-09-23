// src/pages/Login.jsx
import { useState, useContext } from "react";
import { Box, Paper, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      setSnackbar({ open: true, message: `Welcome ${user.name}!`, severity: "success" });
      setTimeout(() => {
        navigate(user.role === "admin" ? "/dashboard" : "/");
      }, 1000);
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || "Login failed", severity: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" margin="normal" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
