import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../DrawerComponent";
import { sampleProfile } from "../Constants";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import React, { useState } from "react";

const PublicProfilePage = () => {
  // edit the bio
  const [editableField, setEditableField] = useState(false);
  const [currentBio, setCurrentBio] = useState(sampleProfile.Bio);

  const handleEditField = () => {
    setEditableField(true);
  };

  // update with the new biography
  const handleSubmitField = () => {
    setEditableField(false);
    console.log(currentBio);
  };

  const handleChangeBio = (event) => {
    setCurrentBio(event.target.value);
  };

  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={8} />
      <Box
        className="remainingViewport"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            background: `
      linear-gradient(to bottom,  #e7f2ff 80%, #19a0ff 20%),
      #e7f2ff 
    `,
          }}
        >
          <Box
            sx={{
              margin: "10px",
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "20ch",
                height: "20ch",
              }}
              alt="Sample Icon"
              src="/sample_icon.png"
            />
            <Box
              sx={{
                marginLeft: "10px",
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "40px",
                  fontWeight: "700",
                  color: "#004d80",
                }}
              >
                {sampleProfile["Name"]}
              </Typography>
              <Typography sx={{ color: "#004d80" }}>
                Student • {sampleProfile["Major"]}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Card
            sx={{
              borderRadius: "10px",
              margin: "55px",
              marginTop: "-10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent sx={{ margin: "10px" }}>
              <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
                About
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <TextField
                  value={currentBio}
                  id="edit-bio"
                  label="About Me"
                  variant="standard"
                  fullWidth
                  multiline
                  disabled={!editableField}
                  onChange={handleChangeBio}
                  sx={{ marginRight: "10px" }}
                />
                {editableField ? (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ color: "white" }}
                    onClick={handleSubmitField}
                  >
                    Save
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleEditField}>
                    Edit
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FolderRoundedIcon sx={{ marginRight: "10px" }} />
                <Typography>Hello</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default PublicProfilePage;
