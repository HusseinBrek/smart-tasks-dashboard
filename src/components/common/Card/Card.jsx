import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function BasicCard({ children, actions, sx = {} }) {
  return (
    <Card sx={{ minWidth: 275, mb: 2, ...sx }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardContent sx={{ flexGrow: 1 }}>{children}</CardContent>
        {actions && <CardActions>{actions}</CardActions>}
      </Box>
    </Card>
  );
}
