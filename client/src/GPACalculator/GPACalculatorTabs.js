import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Autocomplete,
  TextField,
  Alert,
  Tooltip,
} from "@mui/material";
import { HonoursGPAGuide } from "../Constants";
import React, { useState } from "react";
import ModuleDataGrid from "./ModuleDataGrid";
import { GPAGradeGuide } from "./GPACalculatorConstants";
import { ProgressBar } from "../StyledComponents";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { red } from "@mui/material/colors";

export const yearList = ["Year 1", "Year 2", "Year 3", "Year 4"];

// something at the bottom to show whether the student is close to the goal
export const OverallGrade = ({ yearGPA, yearName, gradeTarget }) => {
  const gradeTargetGPA = gradeTarget ? HonoursGPAGuide[gradeTarget] : 0;
  const numericYearGPA = parseFloat(yearGPA);

  let progressPercentage = gradeTargetGPA
    ? (numericYearGPA / gradeTargetGPA) * 100
    : 0;
  if (progressPercentage >= 100) {
    progressPercentage = 100;
  }
  console.log(progressPercentage);

  const barColor = progressPercentage === 100 ? "success" : "error";
  const wordColor = progressPercentage === 100 ? "#44b700" : red[500];

  return (
    <Box sx={{ margin: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>
          Overall
        </Typography>
        <Typography
          color="primary"
          sx={{ marginLeft: "20px", fontSize: "25px", fontWeight: 600 }}
        >
          {yearGPA}
        </Typography>
      </Box>
      {!gradeTargetGPA && (
        <Alert
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          severity="error"
        >
          Please select a grade target to view your current academic standing.
        </Alert>
      )}
      {gradeTargetGPA !== 0 && (
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
                fontSize: "20px",
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
      )}
    </Box>
  );
};

// calculating total workload for the semester
export function calculateSemesterWorkload(gradesList, semesterName, yearName) {
  const matchingYear = gradesList.find(
    (yearObject) => yearObject.year === yearName
  );

  if (!matchingYear) {
    return "0 MCs";
  }

  const matchingSemester = matchingYear.semesters[semesterName];

  if (!matchingSemester) {
    return "0 MCs";
  }

  const totalMCs = matchingSemester.reduce((acc, moduleItem) => {
    return acc + moduleItem.module.mc;
  }, 0);

  return totalMCs.toString() + " MCs";
}

// calculate the year gpa
export function calculateYearGPA(gradesList, yearName) {
  const matchingYear = gradesList.find(
    (yearObject) => yearObject.year === yearName
  );

  if (!matchingYear) {
    return "0 GPA";
  }

  let totalSum = 0;
  let totalMC = 0;

  Object.values(matchingYear.semesters).forEach((semester) => {
    semester.forEach((moduleItem) => {
      if (moduleItem.grade) {
        const gpaData = GPAGradeGuide.find(
          (item) => item.grade === moduleItem.grade
        );
        const mcData = moduleItem.module.mc;
        const gpa = parseFloat(gpaData.GPA * mcData);
        totalSum += gpa;
        totalMC += mcData;
      }
    });
  });

  const result =
    totalMC === 0
      ? 0 + " GPA"
      : (totalSum / totalMC).toFixed(2).toString() + " GPA";

  return result;
}

// calculate the overall gpa for the semester
export function calculateSemesterGPA(gradesList, semesterName, yearName) {
  const matchingYear = gradesList.find(
    (yearObject) => yearObject.year === yearName
  );

  if (!matchingYear) {
    return "0 GPA";
  }

  const matchingSemester = matchingYear.semesters[semesterName];

  if (!matchingSemester) {
    return "0 GPA";
  }

  let totalSum = 0;
  let totalMC = 0;

  matchingSemester.forEach((moduleItem) => {
    if (moduleItem.grade) {
      const gpaData = GPAGradeGuide.find(
        (item) => item.grade === moduleItem.grade
      );
      const mcData = moduleItem.module.mc;
      const gpa = parseFloat(gpaData.GPA * mcData);
      totalSum += gpa;
      totalMC += mcData;
    }
  });

  const result =
    totalMC === 0
      ? 0 + " GPA"
      : (totalSum / totalMC).toFixed(2).toString() + " GPA";

  return result;
}

// component for switching between different views
const GPACalculatorTabs = ({
  handleEditRow,
  handleDeleteRow,
  handleSubmitModule,
  gradesList,
}) => {
  const [activeTab, setActiveTab] = useState(0); // always start with the "Year 1" view
  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
  };

  const [gradeTargetName, setGradeTargetName] = useState("");
  const handleChangeGradeTargetName = (event, value) => {
    setGradeTargetName(value);
  };

  return (
    <Card
      sx={{
        minHeight: "80ch",
        borderRadius: "10px",
        marginTop: "-10px",
        marginBottom: "50px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ margin: "15px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
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
              My Grades
            </Typography>
            <Autocomplete
              sx={{ marginLeft: "30px", width: "350px" }}
              options={Object.keys(HonoursGPAGuide)}
              onChange={handleChangeGradeTargetName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Grade Target"
                  variant="standard"
                  placeholder="Select a grade target to work towards!"
                />
              )}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Tabs value={activeTab} onChange={handleChangeTab}>
            {gradesList.map((yearObject, index) => (
              <Tab
                value={index}
                sx={{ fontWeight: activeTab === index ? 600 : 500 }}
                label={yearObject.year}
              />
            ))}
          </Tabs>
        </Box>
        {gradesList[activeTab]?.semesters && (
          <div>
            {Object.entries(gradesList[activeTab].semesters).map(
              ([semester, modules], index) => (
                <div key={index}>
                  <ModuleDataGrid
                    handleEditRow={handleEditRow}
                    handleDeleteRow={handleDeleteRow}
                    handleSubmitModule={handleSubmitModule}
                    yearName={yearList[activeTab]}
                    semesterName={semester}
                    moduleList={modules}
                    semesterWorkload={calculateSemesterWorkload(
                      gradesList,
                      semester,
                      yearList[activeTab]
                    )}
                    semesterGPA={calculateSemesterGPA(
                      gradesList,
                      semester,
                      yearList[activeTab]
                    )}
                    gradeTarget={gradeTargetName}
                  />
                </div>
              )
            )}
            <OverallGrade
              yearGPA={calculateYearGPA(gradesList, yearList[activeTab])}
              gradeTarget={gradeTargetName}
              yearName={yearList[activeTab]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GPACalculatorTabs;
