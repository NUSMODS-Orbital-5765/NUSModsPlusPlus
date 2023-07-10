import { Box, TextField, Typography } from "@mui/material";

const AccountSecurityTab = ({ sampleProfile }) => {
  return (
    <Box sx={{ margin: "55px", marginTop: "-20px" }}>
      <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
        New Username
      </Typography>
      <TextField fullWidth sx={{ marginTop: "10px" }} label="New Username" />
      <Typography sx={{ fontSize: "35px", fontWeight: 700, marginTop: "20px" }}>
        New Password
      </Typography>
      <TextField fullWidth sx={{ marginTop: "10px" }} label="New Password" />
      <TextField
        fullWidth
        sx={{ marginTop: "20px" }}
        label="Confirm Password"
      />
      <Typography sx={{ fontSize: "35px", fontWeight: 700, marginTop: "20px" }}>
        Change Recovery Email
      </Typography>
      <TextField
        fullWidth
        sx={{ marginTop: "10px" }}
        label="New Recovery Email"
      />
    </Box>
  );
};
export default AccountSecurityTab;
