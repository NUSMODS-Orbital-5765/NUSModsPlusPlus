import AppBarComponent from "./AppBar/AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { PageHeader } from "./StyledComponents";

const SemesterTabs = () => {
  return <div></div>;
};

const GPACalculatorPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={4} />
      <Box className="remainingViewport">
        <PageHeader
          header="GPA Calculator"
          subtitle={
            <div>
              A <span style={{ color: "#536DFE" }}>powerful</span>,{" "}
              <span style={{ color: "#536DFE" }}>interactive</span> calculator
              at your fingertips.
            </div>
          }
        />
        <Card sx={{ marginTop: "30px" }}>
          <CardContent></CardContent>
        </Card>
      </Box>
    </div>
  );
};
export default GPACalculatorPage;
