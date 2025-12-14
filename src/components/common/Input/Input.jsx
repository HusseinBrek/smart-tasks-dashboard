import { TextField } from "@mui/material";

export default function Input({ props }) {
  const {
    variant = "outlined",
    fullWidth = true,
    margin = "normal",
    label,
    ...rest
  } = props;

  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      label={label}
      {...rest}
    />
  );
}
