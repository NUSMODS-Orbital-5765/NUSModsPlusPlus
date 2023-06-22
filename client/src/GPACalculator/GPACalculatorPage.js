// PROBLEMS: dunno how to display yearly gpa
// PROBLEMS: haven't displayed an overall gpa
// PROBLEMS: have a "show recommendation" button that points out which modules are doing poorly/ potential s/u recommendation
// PROBLEMS: use react context to keep track of yearly and overall cumulative GPA.
import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { PageHeader } from "../StyledComponents";
import GPACalculatorTabs from "./GPACalculatorTabs";
import { GPACalculatorViewList } from "../Constants";

// calculation of yearly cumulative GPA
export const YearCumulativeGPA = () => {
  return (
    <div>
      <Typography sx={{ fontWeight: 700, fontSize: "30px", marginTop: "20px" }}>
        Overall
      </Typography>
    </div>
  );
};

// content for overall GPA
export const OverallGPAView = () => {
  return <div></div>;
};
// use linear progress with label, distance from goal

// main page content
const GPACalculatorPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={4} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
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
        <Card
          sx={{
            minHeight: "80ch",
            borderRadius: "5px",
            width: "90%",
            marginTop: "40px",
            marginBottom: "50px",
            boxShadow: 1,
          }}
        >
          <CardContent sx={{ marginTop: "10px" }}>
            <GPACalculatorTabs viewList={GPACalculatorViewList} />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default GPACalculatorPage;
