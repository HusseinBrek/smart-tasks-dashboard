import { TextField, MenuItem } from "@mui/material";

export default function Input(props) {
  const {
    variant = "outlined",
    fullWidth = true,
    margin = "normal",
    label,
    select,
    children,
    ...rest
  } = props;

  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      label={label}
      select={select}
      {...rest}
    >
      {select ? children : null}
    </TextField>
  );
}
