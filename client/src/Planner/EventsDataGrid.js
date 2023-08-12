// COMPLETE
import { Card, CardContent, IconButton, Typography, Chip } from "@mui/material";
import { priorityColors, sampleWeekEvents } from "../Constants";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

// events data grid
const EventsDataGrid = ({ eventsList, handleDeleteEvent }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px" }}>{params.value}</div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontSize: "15px", fontWeight: 700 }}>{params.value}</div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Chip
          sx={{ backgroundColor: priorityColors[params.value] }}
          label={params.value}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            data-testid="delete-button"
            onClick={() => handleDeleteEvent(params.row.id, params.row.eventId)}
          >
            <ClearRoundedIcon color="error" />
          </IconButton>
          <IconButton>
            <EditRoundedIcon color="warning" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Card
      sx={{
        marginBottom: "50px",
        borderRadius: "10px",
        marginTop: "-10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ margin: "15px" }}>
        <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
          Events
        </Typography>
        <DataGrid
          sx={{ marginTop: "20px", fontSize: "15px", height: 400 }}
          rows={eventsList}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
};

export default EventsDataGrid;
