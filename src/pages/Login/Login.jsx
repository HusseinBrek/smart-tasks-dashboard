import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { BasicCard } from "../../components/common/Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        alert("Login successful!");
      }, 1500);
    }
  };

  const handleDemoLogin = (role) => {
    setEmail(role === "admin" ? "admin@example.com" : "user@example.com");
    setPassword("password123");

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Logged in as ${role}`);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "white",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Smart Tasks
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Please sign in to continue.
          </Typography>
        </Box>

        <BasicCard
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) {
                  setFormErrors({ ...formErrors, email: "" });
                }
              }}
              error={!!formErrors.email}
              helperText={formErrors.email}
              margin="normal"
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) {
                  setFormErrors({ ...formErrors, password: "" });
                }
              }}
              error={!!formErrors.password}
              helperText={formErrors.password}
              margin="normal"
              disabled={isLoading}
              autoComplete="current-password"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    disabled={isLoading}
                  />
                }
                label="Remember me"
              />

              <Link
                href="#"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isLoading}
              sx={{
                mb: 2,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{ py: 1.5 }}
            >
              Continue as Guest
            </Button>
          </Box>

          <Box sx={{ my: 3, position: "relative" }}>
            <Divider>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                OR
              </Typography>
            </Divider>
          </Box>

          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              align="center"
            >
              Try demo accounts:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Admin Demo
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => handleDemoLogin("user")}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#dc004e",
                  "&:hover": { backgroundColor: "#9a0036" },
                }}
              >
                User Demo
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              align="center"
              sx={{
                mt: 2,
                display: "block",
                fontFamily: "monospace",
              }}
            >
              Email: admin@example.com / user@example.com
              <br />
              Password: password123
            </Typography>
          </Box>
        </BasicCard>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Don't have an account?{" "}
            <Link
              href="#"
              sx={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Link>
          </Typography>

          <Typography
            variant="caption"
            sx={{
              mt: 2,
              display: "block",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            © {new Date().getFullYear()} Smart Tasks Dashboard. All rights
            reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
