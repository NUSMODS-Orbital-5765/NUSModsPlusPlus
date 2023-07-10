import AppBarComponent from "./AppBar/AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";

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
          <Box sx={{ margin: "30px" }}>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "40px",
                fontWeight: "700",
                color: "#004d80",
              }}
            >
              Module planning made easy.
            </Typography>
            <Typography
              sx={{
                marginBottom: "30px",
                marginTop: "-10px",
                fontSize: "17px",
                color: "#004d80",
              }}
            >
              Easily draft semester plans, check major requirements, get
              recommendations, and receive administrative validation.
            </Typography>
            <Button sx={{ marginBottom: "20px" }} variant="contained">
              Create New Plan
            </Button>
          </Box>
          <img src="/module-header.png" style={{ width: "30%" }} />
        </Box>
        <Card
          sx={{
            margin: "55px",
            marginTop: "-10px",
            borderRadius: "10px",
            backgroundColor: "#f2f2f2",
            boxShadow: 0,
          }}
        >
          <CardContent
            sx={{
              margin: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
                  My 4-Year Plan
                </Typography>
                <Chip
                  sx={{ marginLeft: "30px", textTransform: "uppercase" }}
                  label="Current"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  sx={{ marginLeft: "10px", textTransform: "uppercase" }}
                  label="Approved"
                  color="success"
                  variant="outlined"
                />
              </Box>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Box>
            <Typography sx={{ marginTop: "10px" }}>
              <span style={{ fontWeight: 700 }}>Double Major </span> in
              Information Systems and Economics •{" "}
              <span style={{ fontWeight: 700 }}>Minor </span> in Statistics
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            ></Box>
          </CardContent>
        </Card>
        <Box
          sx={{
            marginLeft: "55px",
            marginTop: "-25px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "35px",
              fontWeight: 700,
            }}
          >
            Plans By Semester
          </Typography>
          <Button sx={{ marginLeft: "30px" }} variant="contained">
            Change View
          </Button>
        </Box>
        <Card
          sx={{
            margin: "55px",
            marginTop: "-30px",
            boxShadow: 0,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              Hello
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
export default ModulesPage;
