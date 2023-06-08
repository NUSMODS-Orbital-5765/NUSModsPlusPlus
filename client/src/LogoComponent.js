import { Box, Typography } from "@mui/material";

function LogoComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        marginBottom: "20px",
      }}
    >
      <img src="nusmods_logo_white.png" style={{ width: "30%" }} />
      <Typography
        variant="h1"
        sx={{
          marginTop: "-100px",
          fontSize: "15px",
          fontWeight: 300,
        }}
      >
        A new way to plan
      </Typography>
    </Box>
  );
}

export default LogoComponent;
