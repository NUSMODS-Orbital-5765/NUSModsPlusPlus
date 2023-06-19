import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  MenuItem,
} from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import React, { useState, useEffect } from "react";
import { PossibleGradesList, GPAGradeGuide } from "../Constants";
import { DataGrid } from "@mui/x-data-grid";

// data grid for modules
const ModuleDataGrid = ({ moduleList, semesterName }) => {
  const [rows, setRows] = useState([]);

  // calculating total workload and overall GPA
  const totalWorkload = rows.length * 4;
  const calculateOverallGPA = () => {
    let totalSum = 0;
    rows.forEach((row) => {
      const gpaData = GPAGradeGuide.find((item) => item.grade === row.grade);

      if (gpaData) {
        const gpa = parseFloat(gpaData.GPA);
        totalSum += gpa;
      }
    });
    return totalSum / rows.length;
  };

  // moduleList loaded will change when the tab changes.
  useEffect(() => {
    setRows(moduleList);
  }, [moduleList]);

  // handle uploading of grades for additional modules
  // use web API to fetch module data
  const moduleOptions = [
    { moduleCode: "CS2040", "S/U": "No" },
    { moduleCode: "EC2104", "S/U": "Yes" },
    { moduleCode: "DSA1101", "S/U": "Yes" },
  ];

  const moduleCodeOptions = moduleOptions.map((module) => module.moduleCode);

  // toggling open state of the input fields
  const [openAddRow, setOpenAddRow] = useState(false);
  const handleOpenAddRow = () => {
    if (!openAddRow) {
      setSelectedModule("");
      setSelectedGrade("");
    }
    setOpenAddRow(!openAddRow);
  };

  // recording the value of the input fields
  const [selectedModule, setSelectedModule] = useState("");
  const handleSelectedModule = (event, value) => {
    setSelectedModule(value);
  };

  const [selectedGrade, setSelectedGrade] = useState("");
  const handleSelectedGrade = (event) => {
    setSelectedGrade(event.target.value);
  };

  // uploading values of input fields and adding a new row in data grid.
  const handleAddRow = () => {
    console.log("selectedModule:", selectedModule);
    console.log("moduleOptions:", moduleOptions);

    const criteriaForSU = moduleOptions.find(
      (module) => module.moduleCode === selectedModule
    )?.["S/U"];
    console.log("criteriaForSU:", criteriaForSU);

    const newRow = {
      moduleCode: selectedModule,
      grade: selectedGrade,
      "S/U": criteriaForSU,
    };
    console.log("newRow:", newRow);

    setRows((prevRows) => [...prevRows, newRow]);
  };

  // handle deletion of modules (using red cross button)
  const handleDeleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.moduleCode !== id));
  };

  // data grid fields
  const moduleColumns = [
    {
      field: "moduleCode",
      headerName: "Module Code",
      width: 150,
      editable: false,
      id: true,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "grade",
      headerName: "Module Grade",
      width: 150,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "GPA",
      headerName: "GPA",
      width: 110,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
      valueGetter: (params) => {
        const grade = params.row.grade;
        const gpaData = GPAGradeGuide.find((item) => item.grade === grade);
        return gpaData ? gpaData.GPA : "";
      },
    },
    {
      field: "S/U",
      headerName: "S/U allowed?",
      width: 110,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteRow(params.row.moduleCode)}>
          <ClearRoundedIcon color="error" />
        </IconButton>
      ),
    },
  ];

  // use moduleCode as unique identifier instead of list index
  const getRowId = (row) => row.moduleCode;

  return (
    <Box sx={{ margin: "20px", marginBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "30px" }}>
          {semesterName}
        </Typography>
        <Button
          sx={{ marginLeft: "20px" }}
          variant="contained"
          onClick={handleOpenAddRow}
        >
          Add Module
        </Button>
        {openAddRow && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Autocomplete
              sx={{ width: "30ch" }}
              options={moduleCodeOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Module"
                />
              )}
              onChange={handleSelectedModule}
            />
            <FormControl sx={{ marginLeft: "20px" }}>
              <InputLabel variant="standard">Select Grade</InputLabel>
              <Select
                variant="standard"
                sx={{ width: "30ch" }}
                onChange={handleSelectedGrade}
              >
                {PossibleGradesList.map((grade, index) => (
                  <MenuItem key={index} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              sx={{ marginLeft: "10px", color: "white" }}
              color="success"
              variant="contained"
              disabled={
                selectedModule.length === 0 || selectedGrade.length === 0
              }
              onClick={handleAddRow}
            >
              Add
            </Button>
          </Box>
        )}
        {!openAddRow && (
          <Box
            sx={{ marginLeft: "20px", display: "flex", flexDirection: "row" }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
              GPA:{" "}
              <span style={{ color: "#536DFE" }}>{calculateOverallGPA()}</span>
            </Typography>
            <Typography
              sx={{ marginLeft: "20px", fontSize: "20px", fontWeight: 700 }}
            >
              Workload:{" "}
              <span style={{ color: "#536DFE" }}>{totalWorkload} MCs</span>
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ fontSize: "15px" }}
          rows={rows}
          columns={moduleColumns}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};
export default ModuleDataGrid;
