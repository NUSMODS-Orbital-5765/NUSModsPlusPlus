import React, { useState } from "react";
import { Box, Input, Button, Typography } from "@mui/material";

// code for file upload component
export const PostFileAllowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "video/mp4",
];
const UploadPostFile = ({ allowedTypes, handleFormFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    if (file && validateFileType(file)) {
      setSelectedFile(file);
      handleFormFile(file);
    } else {
      setSelectedFile(null);
      handleFormFile("");
    }
  };

  const validateFileType = (file) => {
    return allowedTypes.includes(file.type);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Input
        id="upload-file"
        name="upload-file"
        type="file"
        inputProps={{
          accept:
            "application/pdf, image/jpeg, image/jpg, image/png, video/mp4",
        }}
        onChange={handleSelectedFile}
        style={{ display: "none" }}
      />
      <label htmlFor="upload-file">
        <Button
          sx={{ marginRight: "20px" }}
          variant="contained"
          component="span"
        >
          Upload File
        </Button>
      </label>
      {selectedFile && (
        <Typography sx={{ fontWeight: 600 }}>{selectedFile.name}</Typography>
      )}
    </Box>
  );
};

export default UploadPostFile;
