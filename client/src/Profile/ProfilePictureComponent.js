//COMPLETE
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Snackbar,
  Input,
} from "@mui/material";
import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

// profile picture section with upload feature
export const ProfilePictureComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("/sample_icon.png");

  const validateFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    if (file && validateFileType(file)) {
      setSelectedFile(file);
      previewImage(file);
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

  // Transfer to backend database
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpload = () => {
    setOpenDialog(true);
    console.log(selectedFile);
  };

  // only for picture editing and cropping
  const editorRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      setCroppedImage(canvas);
    }
  };

  // component displayed when profile pic is being added
  function NoProfilePic() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          marginTop: "10px",
          marginBottom: "50px",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
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
        <Tooltip title="Click to Upload Image" placement="top">
          <label htmlFor="upload-photo">
            <IconButton component="span">
              <img className="no-image" src="no-image.png" />
            </IconButton>
          </label>
        </Tooltip>
        <Typography align="center" color="text.secondary">
          Add a picture so that others can get to know you better!
        </Typography>
      </Box>
    );
  }

  // component displayed when profile pic is being changed
  function UpdateProfilePic() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
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
            <IconButton sx={{ width: 200, height: 200 }} component="span">
              <AvatarEditor
                ref={editorRef}
                image={previewURL}
                width={200}
                height={200}
                border={10}
                color={[255, 255, 255, 1]}
                scale={1}
                rotate={0}
                borderRadius={100}
              />
            </IconButton>
          </Tooltip>
        </label>
        <Typography
          sx={{ marginTop: "10px" }}
          align="center"
          color="text.secondary"
        >
          Drag to reposition image
        </Typography>
      </Box>
    );
  }

  // the main component
  return (
    <div>
      <Card
        sx={{
          borderRadius: "5px",
          marginLeft: "50px",
          width: "400px",
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Box sx={{ margin: "10px", display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>
              My
            </Typography>
            <Typography
              sx={{
                marginLeft: "8px",
                fontSize: "30px",
                fontWeight: 700,
                color: "#536DFE",
              }}
            >
              Picture
            </Typography>
          </Box>
          {previewURL ? UpdateProfilePic() : NoProfilePic()}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedFile}
              onClick={handleUpload}
            >
              Save
            </Button>
            <Snackbar
              open={openDialog}
              autoHideDuration={3000}
              message="Changes saved!"
              onClose={() => setOpenDialog(false)}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePictureComponent;
