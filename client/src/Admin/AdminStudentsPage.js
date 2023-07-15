// Flag icon rendering not complete
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { checkPlanStatus, sampleStudentsList } from "../Constants";
import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { red, grey } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// display of how student profiles will be mapped
export const StudentDataGrid = ({ studentList }) => {
  const navigate = useNavigate();
  // to handle clicking of the row, redirect to user profile

  // for the "approved", "no plan", ""
  const getStatusColor = (status) => {
    if (status === "approved") {
      return (
        <Chip
          variant="filled"
          color="success"
          sx={{
            color: "white",
            textTransform: "uppercase",
            fontWeight: 500,
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
            fontWeight: 500,
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
            fontWeight: 500,
          }}
          label={status}
        />
      );
    }
  };
  const columns = [
    {
      field: "studentId",
      headerName: "Student ID",
      width: 100,
      renderCell: (params) => <Typography>{params.value}</Typography>,
    },
    {
      field: "profile",
      headerName: "Profile",
      width: 200,
      renderCell: (params) => (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "flex-start",
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
      width: 130,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "secondDegree",
      headerName: "2nd Deg.",
      width: 130,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "secondMajor",
      headerName: "2nd Maj.",
      width: 130,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "minor",
      headerName: "Minors",
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {params.value.map((minor, index) => (
            <Chip
              variant="filled"
              sx={{ borderRadius: "5px" }}
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
      width: 80,
      renderCell: (params) => (
        <Typography sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => getStatusColor(checkPlanStatus(params.row)),
    },
    {
      field: "flag",
      headerName: "Flag",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title="Flag student" placement="top">
            <Checkbox />
          </Tooltip>
        </Box>
      ),
    },
  ];

  const getRowId = (row) => row.studentId;

  // find the maximum height of the rows
  const getRowHeight = (params) => {
    const lineHeight = 40;
    const minHeight = 120;

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
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        sx={{ fontSize: "16px", borderRadius: "5px" }}
        rows={studentList}
        columns={columns}
        getRowId={getRowId}
        getRowHeight={getRowHeight}
      />
    </div>
  );
};

// styling for admin students page
const AdminStudentsPage = () => {
  return (
    <div>
      <AdminAppBar />
      <AdminDrawerComponent defaultTab={2} />
      <Box className="remainingViewport">
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
          <Box sx={{ margin: "30px" }}>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "40px",
                fontWeight: "700",
                color: "#004d80",
              }}
            >
              Student Profile Database
            </Typography>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "17px",
                color: "#004d80",
              }}
            >
              Filter the database according to your needs or create lists of
              students for further attention.
            </Typography>
            <Button sx={{ marginTop: "-10px" }} variant="contained">
              Create New List
            </Button>
          </Box>
          <img src="/admin-students-icon.png" style={{ width: "40%" }} />
        </Box>
        <Box sx={{ margin: "55px" }}>
          <Box
            sx={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <FormControl fullWidth>
              <InputLabel variant="standard">
                Filter by My Department
              </InputLabel>
              <Select variant="standard" label="Filter by My Department">
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            {false && (
              <FormControl fullWidth sx={{ marginRight: "20px" }}>
                <InputLabel>Filter by Other Faculty or Programme</InputLabel>
                <Select label="Filter by Other Faculty or Programme">
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth sx={{ marginLeft: "20px" }}>
              <InputLabel>Filter by Academic Plan</InputLabel>
              <Select label="Filter by Academic Plan">
                <MenuItem value={"single-degree"}>Single Degree</MenuItem>
                <MenuItem value={"double-degree"}>Double Degree</MenuItem>
                <MenuItem value={"double-major"}>Double Major</MenuItem>
              </Select>
            </FormControl>
            <Button sx={{ marginLeft: "20px" }} variant="contained">
              Go
            </Button>
          </Box>
          <StudentDataGrid studentList={sampleStudentsList} />
        </Box>
      </Box>
    </div>
  );
};

export default AdminStudentsPage;
