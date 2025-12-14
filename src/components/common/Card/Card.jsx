import { Card as MuiCard, CardContent, CardActions, Box } from "@mui/material";

export default function Card({ children, actions }) {
  return (
    <MuiCard sx={{ minWidth: 275, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardContent sx={{ flexGrow: 1 }}>{children}</CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </Box>
    </MuiCard>
  );
}
