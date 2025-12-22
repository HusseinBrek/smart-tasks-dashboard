import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { AppRegistration as RegisterIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let temp = {};
    if (!formData.name) temp.name = "Full Name is required";
    if (!/$^|.+@.+..+/.test(formData.email)) temp.email = "Email is not valid";
    if (formData.password.length < 3)
      temp.password = "Password must be at least 3 characters";
    if (formData.password !== formData.confirmPassword)
      temp.confirmPassword = "Passwords do not match";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;
      const success = await register(dataToSend);
      if (success) navigate("/dashboard");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <RegisterIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold">
              Create Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                label="Email Address"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <Button type="submit" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
