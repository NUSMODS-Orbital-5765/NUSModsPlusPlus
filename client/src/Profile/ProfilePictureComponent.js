//COMPLETE
import { Tooltip, Snackbar, Input, Alert } from "@mui/material";
import React, { useState } from "react";

// profile picture section with upload feature
export const ProfilePictureComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("/sample_icon.png");
  const [openDialog, setOpenDialog] = useState(false);

  const validateFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    if (file && validateFileType(file)) {
      setSelectedFile(file);
      previewImage(file);
      setOpenDialog(true);
    } else {
      setSelectedFile(null);
      setPreviewURL(null);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // transfer to backend database
  const handleUpload = () => {
    setOpenDialog(true);
    console.log(selectedFile);
  };

  // the main component
  return (
    <div>
      <Input
        id="upload-photo"
        name="upload-photo"
        type="file"
        inputProps={{
          accept: "image/jpeg, image/jpg, image/png",
        }}
        onChange={handleSelectedFile}
        style={{ display: "none" }}
      />
      <label htmlFor="upload-photo">
        <Tooltip title="Click to Upload Image" placement="top">
          <div
            style={{
              margin: "20px",
              marginBottom: "40px",
              width: "30ch",
              height: "30ch",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={previewURL}
              alt="Profile Picture"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Tooltip>
      </label>
      <Snackbar
        open={openDialog}
        autoHideDuration={3000}
        onClose={() => setOpenDialog(false)}
      >
        <Alert
          onClose={() => setOpenDialog(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          Profile Picture updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProfilePictureComponent;
