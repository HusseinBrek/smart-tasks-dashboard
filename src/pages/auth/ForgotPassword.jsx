import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Box,
  Link,
} from "@mui/material";
import { Button } from "../../components/common/Button";
import { findUserByEmail, updatePassword } from "../../api/authService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [foundUserId, setFoundUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleFindAccount = async (e) => {
    e.preventDefault();
    const user = await findUserByEmail(email);
    if (user) {
      setFoundUserId(user.id);
      setStep(2);
      toast.success("Account found! Please enter your new password.", {
        duration: 4000,
      });
    } else {
      toast.error("No account found with this email.", {
        duration: 6000,
      });
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const success = await updatePassword(foundUserId, newPassword);
    if (success) {
      toast.success("Password updated successfully! Please login.", {
        duration: 4000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10 }}>
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            {step === 1 ? "Find Your Account" : "Reset Password"}
          </Typography>

          {step === 1 ? (
            <form onSubmit={handleFindAccount}>
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary">
                  Enter your email to verify your identity.
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" fullWidth>
                  Verify Email
                </Button>
                <Link href="/login" underline="hover" sx={{ mt: 2 }}>
                  Go to Login
                </Link>
              </Stack>
            </form>
          ) : (
            <form onSubmit={handleReset}>
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary">
                  Set a strong password for your account.
                </Typography>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" fullWidth color="success">
                  Update Password
                </Button>
                <Link href="/login" underline="hover" sx={{ mt: 2 }}>
                  Go to Login
                </Link>
              </Stack>
            </form>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
