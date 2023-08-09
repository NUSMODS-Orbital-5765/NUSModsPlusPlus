//COMPLETE
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
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import React, { useState, useEffect } from "react";
import {
  possibleGradesList,
  GPAGradeGuide,
  addModuleOptions,
} from "./GPACalculatorConstants";
import { DataGrid } from "@mui/x-data-grid";
import { orange } from "@mui/material/colors";

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
    setNewModuleGrade("");
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
    };
    handleCloseDialog();
    // pass in a callback function
    handleSubmitModule(moduleObject);
    setSelectedGrade("");
    setSelectedModuleCode("");
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
                disabled={!selectedModuleCode}
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
  let totalMC = 0;
  rows.forEach((row) => {
    if (row.grade) {
      const gpaData = GPAGradeGuide.find((item) => item.grade === row.grade);
      const mcData = row.mc;
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

// data grid for modules
const ModuleDataGrid = ({ moduleList, semesterName }) => {
  // for snackbars/alerts
  const [editSuccess, setEditSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  // original module array with each module as a dictionary/object & the relevant grade
  const [newModuleList, setNewModuleList] = useState(moduleList);
  const flattenedModuleList = newModuleList.flatMap((module) => {
    return {
      code: module.module.code,
      name: module.module.name,
      grade: module.grade,
      "S/U": module.module["S/U"],
      mc: module.module.mc,
    };
  });

  // moduleList loaded will change when the tab changes.
  useEffect(() => {
    setNewModuleList(moduleList);
  }, [moduleList]);

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
    setEditSuccess(true);
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
    setAddSuccess(true);
  };

  // data grid fields
  const moduleColumns = [
    {
      field: "code",
      headerName: "Code",
      flex: 0.7,
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
      flex: 0.3,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "GPA",
      headerName: "GPA",
      flex: 0.3,
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
      headerName: "Can S/U",
      flex: 0.5,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "mc",
      headerName: "MCs",
      flex: 0.3,
      editable: false,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => handleDeleteRow(params.row.code)}>
              <ClearRoundedIcon color="error" sx={{ fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleOpenEditDialog(params.row.code)}>
              <EditRoundedIcon sx={{ color: orange[600], fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  // S/U recommendations shall be given separately.
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Get S/U Recommendation" placement="top">
              <IconButton>
                <AutoFixHighRoundedIcon
                  color="success"
                  sx={{ fontSize: "30px" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add a Module" placement="top">
              <IconButton onClick={handleOpenAddRow}>
                <LibraryAddRoundedIcon
                  color="primary"
                  sx={{ fontSize: "30px" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
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
    </Box>
  );
};
export default ModuleDataGrid;
