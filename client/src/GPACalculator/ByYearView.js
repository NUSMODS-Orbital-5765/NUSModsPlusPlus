import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  IconButton,
  Box,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { PossibleSemestersList } from "../Constants";
import ModuleDataGrid from "./ModuleDataGrid";
import React, { useState } from "react";

// tabs & content for by year view
const ByYearView = ({ yearList }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
  };

  // logic for easy addition of previous and future academic years
  const [tabsList, setTabsList] = useState(yearList);
  const getPreviousAcademicYear = (currentYear) => {
    const [startYear, endYear] = currentYear.split("/");
    const previousStartYear = parseInt(startYear) - 1;
    const previousEndYear = parseInt(endYear) - 1;
    return `${previousStartYear}/${previousEndYear}`;
  };

  const getNextAcademicYear = (currentYear) => {
    const [startYear, endYear] = currentYear.split("/");
    const nextStartYear = parseInt(startYear) + 1;
    const nextEndYear = parseInt(endYear) + 1;
    return `${nextStartYear}/${nextEndYear}`;
  };

  const handleAddYearBefore = () => {
    const firstYear = tabsList[0].year;
    const previousYear = getPreviousAcademicYear(firstYear);

    const updatedTabsList = [
      { year: previousYear, semesters: {} },
      ...tabsList,
    ];

    setTabsList(updatedTabsList);
  };

  const handleAddYearAfter = () => {
    const lastYear = tabsList[tabsList.length - 1].year;
    const nextYear = getNextAcademicYear(lastYear);

    const updatedTabsList = [...tabsList, { year: nextYear, semesters: {} }];

    setTabsList(updatedTabsList);
  };

  // logic for adding a semester (display the module data grid with no rows)
  // toggling the open state of input field
  const [openAddSemester, setOpenAddSemester] = useState(false);
  const handleToggleAddSemester = () => {
    if (!openAddSemester) {
      setSelectedSemester("");
    }
    setOpenAddSemester(!openAddSemester);
  };

  // saving the value of the input field
  const [selectedSemester, setSelectedSemester] = useState("");
  const handleSelectedSemester = (event) => {
    setSelectedSemester(event.target.value);
    console.log(selectedSemester);
  };

  // adding a new data grid (with title and buttons) for the added semester
  const handleConfirmAddSemester = (selectedSemester) => {
    const updatedTabsList = [...tabsList];
    updatedTabsList[activeTab].semesters[selectedSemester] = [];
    setTabsList([...updatedTabsList]);
    console.log(tabsList);
    setOpenAddSemester(false);
  };

  // logic for deleting tabs (in case of mistake)
  const handleDeleteAcademicYear = () => {
    setTabsList(tabsList.filter((tab, index) => index !== activeTab));
  };

  return (
    <div>
      <Box
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "10px",
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <IconButton onClick={handleAddYearBefore}>
          <AddRoundedIcon />
        </IconButton>
        <Tabs value={activeTab} onChange={handleChangeTab}>
          {Object.entries(tabsList).map(([yearKey, yearDict]) => (
            <Tab
              sx={{
                borderRadius: "5px",
                fontWeight: 600,
                fontSize: "15px",
              }}
              key={yearKey}
              label={yearDict.year}
            />
          ))}
        </Tabs>
        <IconButton onClick={handleAddYearAfter}>
          <AddRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          margin: "20px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button variant="contained" onClick={handleToggleAddSemester}>
            Add Semester
          </Button>
          {openAddSemester && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <FormControl sx={{ marginLeft: "20px" }}>
                <InputLabel variant="standard">Select Semester</InputLabel>
                <Select
                  variant="standard"
                  sx={{ width: "30ch" }}
                  onChange={handleSelectedSemester}
                >
                  {PossibleSemestersList.map((semester, index) => (
                    <MenuItem
                      key={index}
                      value={semester}
                      disabled={tabsList[activeTab].semesters[semester]}
                    >
                      {semester}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{ marginLeft: "10px", color: "white" }}
                variant="contained"
                color="success"
                onClick={() => handleConfirmAddSemester(selectedSemester)}
                disabled={selectedSemester.length === 0}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeleteAcademicYear}
        >
          Delete Academic Year
        </Button>
      </Box>
      {Object.entries(tabsList[activeTab].semesters).map(
        ([semesterName, semesterModules]) => (
          <ModuleDataGrid
            moduleList={semesterModules}
            semesterName={semesterName}
          />
        )
      )}
    </div>
  );
};

export default ByYearView;
