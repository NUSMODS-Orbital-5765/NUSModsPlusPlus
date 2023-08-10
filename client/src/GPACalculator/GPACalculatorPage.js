import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import GPACalculatorTabs from "./GPACalculatorTabs";
import { combinedItems } from "../Home/HomePageStyledComponents";
import { sampleModuleGrades } from "./GPACalculatorConstants";
import GPACalculatorOverall from "./GPACalculatorOverall";
import React, { useState } from "react";

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
      <img src="/calculator-intro.png" style={{ width: "30%" }} />
    </Box>
  );
};

// main page content
const GPACalculatorPage = () => {
  // fetch the user data from the database here
  // maybe can load the default semesterModulePlans?? can??
  // but need to fetch data about whether the module can be s/ued, and the module credits as well.

  // state management for grade target
  const [gradeTargetName, setGradeTargetName] = useState("");
  const handleChangeGradeTargetName = (event, value) => {
    setGradeTargetName(value);
  };

  // state management of the moduleList
  const [newModuleList, setNewModuleList] = useState(sampleModuleGrades);

  // snackbars and alerts
  const [editSuccess, setEditSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  function handleDeleteRow(moduleCode, semesterName, yearName) {
    const updatedModuleList = newModuleList.map((yearObject) => {
      if (yearObject.year === yearName) {
        const updatedSemesters = { ...yearObject.semesters };
        if (updatedSemesters[semesterName]) {
          const filteredModules = updatedSemesters[semesterName].filter(
            (moduleObject) => moduleObject.module.code !== moduleCode
          );
          updatedSemesters[semesterName] = filteredModules;
        }

        return {
          ...yearObject,
          semesters: updatedSemesters,
        };
      }
      return yearObject;
    });
    setNewModuleList(updatedModuleList);
    console.log(updatedModuleList);
    setDeleteSuccess(true);
  }

  // function for editing the relevant row with the new module grade
  function handleEditRow(moduleCode, newModuleGrade, semesterName, yearName) {
    setNewModuleList((prevModuleList) =>
      prevModuleList.map((yearObject) => {
        if (yearObject.year === yearName) {
          const updatedSemesters = { ...yearObject.semesters };
          if (updatedSemesters[semesterName]) {
            updatedSemesters[semesterName] = updatedSemesters[semesterName].map(
              (moduleItem) => {
                if (moduleItem.module.code === moduleCode) {
                  return {
                    ...moduleItem,
                    grade: newModuleGrade,
                  };
                }
                return moduleItem;
              }
            );
          }

          return {
            ...yearObject,
            semesters: updatedSemesters,
          };
        }

        return yearObject;
      })
    );
    console.log(newModuleList);
    setEditSuccess(true);
  }

  // function for adding a module
  const handleSubmitModule = (moduleObject, semesterName, yearName) => {
    console.log(moduleObject);
    console.log(semesterName);
    console.log(yearName);

    const updatedModuleList = newModuleList.map((yearObject) => {
      if (yearObject.year === yearName) {
        const updatedSemesters = { ...yearObject.semesters };
        if (updatedSemesters[semesterName]) {
          updatedSemesters[semesterName].push(moduleObject);
        } else {
          updatedSemesters[semesterName] = [moduleObject];
        }

        return {
          ...yearObject,
          semesters: updatedSemesters,
        };
      }

      return yearObject;
    });
    setNewModuleList(updatedModuleList);
    console.log(updatedModuleList);
    setAddSuccess(true);
  };

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
            justifyContent: "space-between",
            marginLeft: "55px",
            marginRight: "55px",
          }}
        >
          <Box sx={{ width: "70%" }}>
            <GPACalculatorTabs
              handleSubmitModule={handleSubmitModule}
              handleEditRow={handleEditRow}
              handleDeleteRow={handleDeleteRow}
              gradesList={newModuleList}
              gradeTargetName={gradeTargetName}
              handleChangeGradeTargetName={handleChangeGradeTargetName}
            />
          </Box>
          <Box sx={{ width: "30%", marginLeft: "40px" }}>
            <GPACalculatorOverall
              gradesList={newModuleList}
              gradeTargetName={gradeTargetName}
            />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={addSuccess}
        autoHideDuration={3000}
        onClose={() => setAddSuccess(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setAddSuccess(false)}
          severity="success"
          sx={{ color: "white", width: "100%" }}
        >
          Module added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={editSuccess}
        autoHideDuration={3000}
        onClose={() => setEditSuccess(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setEditSuccess(false)}
          severity="success"
          sx={{ color: "white", width: "100%" }}
        >
          Module edited successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccess(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setDeleteSuccess(false)}
          severity="success"
          sx={{ color: "white", width: "100%" }}
        >
          Module deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GPACalculatorPage;
