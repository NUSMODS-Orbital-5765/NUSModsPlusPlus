import { Box, LinearProgress, Typography } from "@mui/material";
import { ProgressBar } from "../StyledComponents";

const HomePageTaskProgressBar = ({ taskList }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{ marginRight: "30px", fontSize: "35px", fontWeight: 700 }}
        >
          Task Progress
        </Typography>
        <Typography variant="h1" sx={{ fontSize: "30px" }}>
          <span style={{ color: "#44b700" }}>5</span>/25
        </Typography>
      </Box>
      <ProgressBar color="success" value={30} />
    </Box>
  );
};

export default HomePageTaskProgressBar;
