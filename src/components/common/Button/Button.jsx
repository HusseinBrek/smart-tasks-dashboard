import MuiButoon from "@mui/material/Button";
export default function Button(props) {
  const { variant = "contained", color = "primary", children } = props;
  return (
    <MuiButoon variant={variant} color={color}>
      {children}
    </MuiButoon>
  );
}
