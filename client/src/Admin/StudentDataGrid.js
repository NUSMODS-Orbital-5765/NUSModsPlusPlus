// Flag icon rendering not complete
// using student profile as placeholder for the time being, until module page is complete
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { checkPlanStatus } from "./AdminConstants";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { grey, orange } from "@mui/material/colors";
import React, { useState } from "react";
import UserProfileView from "../UserProfileView";

// for the "approved", "no plan", "flagged", "rejected" plan status
const getStatusColor = (status) => {
  if (status === "approved") {
    return (
      <Chip
        variant="filled"
        color="success"
        sx={{
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
        label={status}
      />
    );
  } else if (status === "no plan") {
    return (
      <Chip
        variant="filled"
        sx={{
          backgroundColor: grey[500],
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
        label={status}
      />
    );
  } else if (status === "flagged") {
    return (
      <Chip
        variant="filled"
        sx={{
          backgroundColor: orange[500],
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
        label={status}
      />
    );
  } else {
    return (
      <Chip
        variant="filled"
        color="error"
        sx={{
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
        label={status}
      />
    );
  }
};

// display of how student profiles will be mapped
const StudentDataGrid = ({ studentList, color }) => {
  // open dialog when the user clicks on a row
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // for the flagging feature, flagging is for those requiring further attention. like pending/need email to clarify, etc. idk
  const handleActionButtonClick = () => {
    console.log("hello!");
  };

  // styling the columns of the datagrid
  const columns = [
    {
      field: "studentId",
      headerName: "Student ID",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 0.8,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "profile",
      headerName: "Profile",
      flex: 1.5,
      headerClassName: color ? "custom-datagrid-header" : "",
      renderCell: (params) => (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "flex-start",
            overflowX: "auto",
          }}
        >
          <Avatar
            sx={{ width: "40%", height: "40%" }}
            src={params.row.avatar}
            alt="Avatar"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontWeight: 600,
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              {params.row.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                color: "text.secondary",
                whiteSpace: "normal",
                wordWrap: "break-word",
              }}
            >
              {params.row.username}
            </Typography>
          </Box>
        </Box>
      ),
      valueGetter: (params) =>
        `${params.row.avatar} ${params.row.name} ${params.row.username}`,
    },
    {
      field: "primaryDegree",
      headerName: "Degree",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 1.1,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "secondDegree",
      headerName: "2nd Deg.",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 1.1,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "secondMajor",
      headerName: "2nd Maj.",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 1.1,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "minor",
      headerName: "Minors",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 1.1,
      renderCell: (params) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {params.value.map((minor, index) => (
            <Chip
              variant="filled"
              sx={{
                fontSize: "15px",
                padding: "2px",
                borderRadius: "5px",
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
              key={index}
              label={minor}
            />
          ))}
        </div>
      ),
    },
    {
      field: "programme",
      headerName: "Prog.",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 0.7,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 1,
      renderCell: (params) => getStatusColor(checkPlanStatus(params.row)),
    },
    {
      field: "flag",
      headerName: "Flag",
      headerClassName: color ? "custom-datagrid-header" : "",
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title="Flag student" placement="top">
            <IconButton>
              <FlagRoundedIcon color="primary" sx={{ fontSize: "25px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // sets id column of datagrid as student id
  const getRowId = (row) => row.studentId;

  // find the maximum height of the rows, just an aesthetic thing
  const getRowHeight = (params) => {
    const lineHeight = 50;
    const minHeight = 100;

    const maxContentHeight = studentList.reduce((maxHeight, row) => {
      if (row.minor) {
        const contentHeight = row.minor.length * lineHeight;
        return Math.max(maxHeight, contentHeight);
      }
      return maxHeight;
    }, 0);

    return Math.max(maxContentHeight, minHeight);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <DataGrid
        sx={{
          fontSize: "16px",
          borderRadius: "5px",
          minHeight: "200px",
          backgroundColor: "white",
        }}
        autoHeight
        rows={studentList}
        columns={columns}
        getRowId={getRowId}
        getRowHeight={getRowHeight}
        disableRowSelectionOnClick
        onRowClick={handleRowClick}
      />
      {/* replace this with a different view --> student module profile view */}
      <UserProfileView
        userProfile={selectedRow}
        openDialog={openDialog}
        userType="student"
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default StudentDataGrid;