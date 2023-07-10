import AppBarComponent from "./AppBar/AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import { Box, Typography, Card, CardContent } from "@mui/material";

const ModulesPage = () => {
  return (
    <div className="homepage">
      <DrawerComponent defaultTab={3} />
      <AppBarComponent />
      <Box className="remainingViewport">
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#e7f2ff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              margin: "30px",
              fontSize: "40px",
              fontWeight: "700",
              color: "#004d80",
            }}
          >
            Plan your semesters efficiently and effectively.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
export default ModulesPage;
