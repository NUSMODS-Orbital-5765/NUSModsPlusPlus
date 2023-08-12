import { Card, CardContent, Typography, Box } from "@mui/material";
import { GPAGradeGuide } from "./GPACalculatorConstants";
import { HonoursGPAGuide } from "../Constants";
import { ProgressBar } from "../StyledComponents";
import { red } from "@mui/material/colors";

// calculate the overall GPA
export function calculateOverallGPA(gradesList) {
  let totalSum = 0;
  let totalMC = 0;

  gradesList.forEach((year) => {
    Object.values(year.semesters).forEach((semester) => {
      semester.forEach((moduleItem) => {
        if (
          moduleItem.grade &&
          moduleItem.grade !== "S" &&
          moduleItem.grade !== "U"
        ) {
          const gpaData = GPAGradeGuide.find(
            (item) => item.grade === moduleItem.grade
          );
          const mcData = moduleItem.module.mc;
          const gpa = parseFloat(gpaData.GPA) * mcData;
          totalSum += gpa;
          totalMC += mcData;
        }
      });
    });
  });

  if (totalMC === 0) {
    return "0 GPA";
  }

  const overallGPA = totalSum / totalMC;
  return overallGPA.toFixed(2);
}

// calculate academic standing of the student
export function calculateAcadStanding(overallGPA) {
  if (overallGPA >= HonoursGPAGuide["Honours (Highest Distinction)"]) {
    return "Honours (Highest Distinction)";
  } else if (overallGPA >= HonoursGPAGuide["Honours (Distinction)"]) {
    return "Honours (Distinction)";
  } else if (overallGPA >= HonoursGPAGuide["Honours (Merit)"]) {
    return "Honours (Merit)";
  } else if (overallGPA >= HonoursGPAGuide["Honours"]) {
    return "Honours";
  } else if (overallGPA >= HonoursGPAGuide["Pass"]) {
    return "Pass";
  } else {
    return "Unsatisfactory";
  }
}

export const GPAProgressBar = ({
  progressPercentage,
  gradeTargetGPA,
  fontSize,
}) => {
  return (
    <div>
      <Box
        sx={{
          marginTop: "-10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            color: progressPercentage >= 70 ? "#44b700" : red[500],
            fontSize: fontSize,
            fontWeight: 600,
            marginBottom: "5px",
          }}
        >
          {progressPercentage === 100
            ? gradeTargetGPA.toFixed(2) + " GPA target reached!"
            : progressPercentage.toFixed(0) +
              "% to " +
              gradeTargetGPA.toFixed(2) +
              " GPA goal"}
        </Typography>{" "}
      </Box>
      <ProgressBar
        color={progressPercentage >= 70 ? "success" : "error"}
        value={progressPercentage}
      />
    </div>
  );
};

// overall GPA card component
const GPACalculatorOverall = ({ gradesList, gradeTargetName }) => {
  const overallGPA = calculateOverallGPA(gradesList);
  const gradeTargetGPA = gradeTargetName ? HonoursGPAGuide[gradeTargetName] : 0;
  let progressPercentage = gradeTargetGPA
    ? (overallGPA / gradeTargetGPA) * 100
    : 0;
  if (progressPercentage >= 100) {
    progressPercentage = 100;
  }

  return (
    <Card
      sx={{
        backgroundColor: "#f2f2f2",
        marginTop: "-10px",
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ margin: "10px" }}>
        <Typography
          sx={{ marginBottom: "10px", fontSize: "35px", fontWeight: 700 }}
        >
          Overall
        </Typography>
        <Typography
          sx={{ fontSize: "30px", color: "#1a90ff", fontWeight: 600 }}
        >
          {overallGPA} GPA
        </Typography>
        <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
          {calculateAcadStanding(overallGPA)}
        </Typography>
        {gradeTargetGPA !== 0 && (
          <Box sx={{ marginTop: "30px" }}>
            <GPAProgressBar
              progressPercentage={progressPercentage}
              gradeTargetGPA={gradeTargetGPA}
              fontSize="17px"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
export default GPACalculatorOverall;
