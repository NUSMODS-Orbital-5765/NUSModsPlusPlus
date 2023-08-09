//COMPLETE
// make the grade field editable so that user can "import modules" and update with grades accordingly.
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  Autocomplete,
  TextField,
} from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useState, useEffect } from "react";
import {
  possibleGradesList,
  GPAGradeGuide,
  addModuleOptions,
} from "./GPACalculatorConstants";
import { DataGrid } from "@mui/x-data-grid";

// dialog for user to add modules
export const EditModuleDialog = ({
  moduleCode,
  openDialog,
  handleCloseDialog,
  handleEditRow,
}) => {
  const [newModuleGrade, setNewModuleGrade] = useState("");
  const handleNewModuleGrade = (event, value) => {
    setNewModuleGrade(value);
  };

  const handleClickEditModule = () => {
    handleEditRow(moduleCode, newModuleGrade);
    handleCloseDialog();
  };

  return (
    <div>
      <Dialog
        minWidth="md"
        fullWidth
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent sx={{ margin: "10px" }}>
          <Box
            sx={{ height: "auto", display: "flex", flexDirection: "column" }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              Edit Module
            </Typography>
            <TextField
              sx={{ marginTop: "20px" }}
              label="Module Code"
              defaultValue={moduleCode}
              InputProps={{
                readOnly: true,
              }}
            />
            <Autocomplete
              onChange={handleNewModuleGrade}
              fullWidth
              options={possibleGradesList}
              ListboxProps={{ style: { maxHeight: 200 } }}
              sx={{ marginTop: "30px" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Grade" />
              )}
            />
            <Box
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ color: "white" }}
                variant="contained"
                onClick={handleClickEditModule}
              >
                Edit Grade
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// IMPORTANT! use back the module dialog that is under "Add Module" in modules page
// dialog for adding new modules
export const AddModuleDialog = ({
  openDialog,
  handleCloseDialog,
  handleSubmitModule,
}) => {
  const flattenedAddModuleOptions = addModuleOptions.flatMap(
    (module) => module.code
  );

  const [selectedModuleCode, setSelectedModuleCode] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const handleSelectedModuleCode = (event, value) => {
    setSelectedModuleCode(value);
  };

  const handleSelectedGrade = (event, value) => {
    setSelectedGrade(value);
  };

  const handleClickAddModule = () => {
    // create a module object
    const selectedModule = addModuleOptions.find(
      (option) => option.code === selectedModuleCode
    );
    const moduleObject = {
      module: selectedModule,
      grade: selectedGrade,
      "S/U": "Yes",
    };
    handleCloseDialog();
    // pass in a callback function
    handleSubmitModule(moduleObject);
  };

  return (
    <div>
      <Dialog
        minWidth="md"
        fullWidth
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent sx={{ margin: "10px" }}>
          <Box
            sx={{ height: "auto", display: "flex", flexDirection: "column" }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: "700" }}>
              Add Module
            </Typography>
            <Autocomplete
              onChange={handleSelectedModuleCode}
              options={flattenedAddModuleOptions}
              ListboxProps={{ style: { maxHeight: 200 } }}
              fullWidth
              sx={{ marginTop: "20px" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Module" />
              )}
            />
            <Autocomplete
              onChange={handleSelectedGrade}
              fullWidth
              options={possibleGradesList}
              ListboxProps={{ style: { maxHeight: 200 } }}
              sx={{ marginTop: "30px" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Grade" />
              )}
            />
            <Box
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ color: "white" }}
                variant="contained"
                onClick={handleClickAddModule}
              >
                Add Module
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// calculating total workload and overall GPA
export function totalWorkload(rows) {
  return (rows.length * 4).toString() + " MCs";
}

export function calculateOverallGPA(rows) {
  let totalSum = 0;
  rows.forEach((row) => {
    const gpaData = GPAGradeGuide.find((item) => item.grade === row.grade);

    if (gpaData) {
      const gpa = parseFloat(gpaData.GPA);
      totalSum += gpa;
    }
  });
  return (totalSum / rows.length).toFixed(2).toString() + " GPA"; // correct to 2 dp
}

// data grid for modules
const ModuleDataGrid = ({ moduleList, semesterName }) => {
  const [newModuleList, setNewModuleList] = useState(moduleList);
  const flattenedModuleList = newModuleList.flatMap((module) => {
    return {
      code: module.module.code,
      name: module.module.name,
      grade: module.grade,
      "S/U": module["S/U"],
    };
  });

  function handleDeleteRow(moduleCode) {
    setNewModuleList(
      newModuleList.filter(
        (moduleObject) => moduleObject.module.code !== moduleCode
      )
    );
  }

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentModuleCode, setCurrentModuleCode] = useState("");
  const handleOpenEditDialog = (moduleCode) => {
    setOpenEditDialog(true);
    setCurrentModuleCode(moduleCode);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentModuleCode("");
  };

  // function for editing the relevant row with the new module grade
  function handleEditRow(moduleCode, newModuleGrade) {
    setNewModuleList((prevModuleList) =>
      prevModuleList.map((moduleItem) => {
        if (moduleItem.module.code === moduleCode) {
          return {
            ...moduleItem,
            grade: newModuleGrade,
          };
        }
        return moduleItem;
      })
    );
  }

  const [openAddRow, setOpenAddRow] = useState(false);
  const handleOpenAddRow = () => {
    setOpenAddRow(true);
  };

  const handleCloseAddRow = () => {
    setOpenAddRow(false);
  };

  const handleSubmitModule = (moduleObject) => {
    console.log(moduleObject);
    const updatedModuleList = [...newModuleList, moduleObject];
    setNewModuleList(updatedModuleList);
    console.log(updatedModuleList);
  };

  // data grid fields
  const moduleColumns = [
    {
      field: "code",
      headerName: "Code",
      flex: 0.8,
      editable: false,
      id: true,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <div
          style={{
            fontSize: "15px",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 0.5,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "GPA",
      headerName: "GPA",
      flex: 0.5,
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
        <div>
          <IconButton onClick={() => handleDeleteRow(params.row.code)}>
            <ClearRoundedIcon color="error" />
          </IconButton>
          <IconButton onClick={() => handleOpenEditDialog(params.row.code)}>
            <EditRoundedIcon color="primary" />
          </IconButton>
        </div>
      ),
    },
  ];
  // NOTE TO SELF: always use () => ... calling the function directly will immediately execute it

  // use moduleCode as unique identifier instead of list index
  const getRowId = (row) => row.code;

  return (
    <Box sx={{ margin: "20px", marginBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "30px" }}>
              {semesterName}
            </Typography>
            <Chip
              size="large"
              sx={{
                marginLeft: "20px",
                fontSize: "15px",
                color: "white",
                fontWeight: 600,
              }}
              label={calculateOverallGPA(flattenedModuleList)}
              variant="filled"
              color="success"
            />
            <Chip
              size="large"
              sx={{ fontSize: "15px", marginLeft: "20px", fontWeight: 600 }}
              label={totalWorkload(flattenedModuleList)}
              variant="outlined"
              color="success"
            />
          </Box>
          <Button variant="contained" onClick={handleOpenAddRow}>
            Add Module
          </Button>
        </Box>
      </Box>
      <AddModuleDialog
        openDialog={openAddRow}
        handleCloseDialog={handleCloseAddRow}
        handleSubmitModule={handleSubmitModule}
      />
      <EditModuleDialog
        moduleCode={currentModuleCode}
        openDialog={openEditDialog}
        handleCloseDialog={handleCloseEditDialog}
        handleEditRow={handleEditRow}
      />
      <Box
        sx={{
          marginTop: "10px",
          marginBottom: "40px",
          height: 600,
          width: "100%",
        }}
      >
        <DataGrid
          sx={{ fontSize: "15px" }}
          rows={flattenedModuleList}
          columns={moduleColumns}
          getRowId={getRowId}
          getRowHeight={() => 100}
        />
      </Box>
    </Box>
  );
};
export default ModuleDataGrid;
