import MuiButton from "@mui/material/Button";

export default function Button(props) {
  const { variant = "contained", color = "primary", children, ...rest } = props;
  return (
    <MuiButton variant={variant} color={color} {...rest}>
      {children}
    </MuiButton>
  );
}
