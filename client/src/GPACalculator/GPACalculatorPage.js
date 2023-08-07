import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import { Card, CardContent, Box, Typography } from "@mui/material";
import GPACalculatorTabs from "./GPACalculatorTabs";
import { GPACalculatorViewList } from "../Constants";
import { combinedItems } from "../Home/HomePageStyledComponents";
import { sampleModuleGrades } from "./GPACalculatorConstants";

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

// might have it as a side component rather than have the user keep switching to the "Overall" tab just to see what it looks like
// content for overall GPA
export const OverallGPAView = () => {
  return <div></div>;
};
// use linear progress with label, distance from goal

export const CalculatorPageHeader = () => {
  return (
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
      <Box>
        <Typography
          sx={{
            margin: "30px",
            fontSize: "40px",
            fontWeight: "700",
            color: "#004d80",
          }}
        >
          A handy academic progress tracker.
        </Typography>
        <Typography
          sx={{
            margin: "30px",
            marginTop: "-10px",
            fontSize: "17px",
            color: "#004d80",
          }}
        >
          We log your module grades, visualise your progress over the semesters,
          and provide S/U recommendations.
        </Typography>
      </Box>
      <img style={{ width: "30%" }} src="/calculator-intro.png" />
    </Box>
  );
};

// main page content
const GPACalculatorPage = () => {
  // fetch the user data from the database here
  // check that the status of the module plan is APPROVED before fetching the data as required
  // SOLVE ISSUES WITH THE MODULES PAGE, VERY IMPORTANT
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={4} tabsList={combinedItems} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CalculatorPageHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "space-between",
            marginLeft: "55px",
            marginRight: "55px",
          }}
        >
          <Box sx={{ width: "70%" }}>
            <GPACalculatorTabs gradesList={sampleModuleGrades} />
          </Box>
          <Box sx={{ width: "30%" }}>
            <Card
              sx={{
                marginLeft: "40px",
                backgroundColor: "#f2f2f2",
                marginRight: "30px",
                borderRadius: "10px",
                boxShadow: 0,
              }}
            >
              <CardContent>
                <Typography>Hello</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default GPACalculatorPage;
