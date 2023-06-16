//COMPLETE
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Autocomplete,
  Fab,
  Tooltip,
  Select,
  Snackbar,
  MenuItem,
} from "@mui/material";
import { majorList } from "../Constants";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState, useEffect } from "react";
import { SlideTransition } from "../StyledComponents";
import { MyTextEditor, PostTagsField } from "../FormStyledComponents";
import UploadPostFile, { PostFileAllowedTypes } from "./UploadPostFile";

// styling for post upload form component
export const UploadPostForm = () => {
  // placeholder for actual post upload feature
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = () => {
    console.log("submitted!");
    setSubmitSuccess(true);
  };

  // form validation
  const [isFormValid, setIsFormValid] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [formErrors, setFormErrors] = useState({
    titleError: false,
    categoryError: false,
  });

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostCategoryChange = (event) => {
    setPostCategory(event.target.value);
  };

  useEffect(() => {
    validateForm();
  }, [postTitle, postCategory]);

  const validateForm = () => {
    const errors = {
      titleError: postTitle.trim().length < 1,
      categoryError: postCategory === "",
    };

    setFormErrors(errors);

    const isValid = Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  };

  // combines related major with the tags (automatic) for easier sorting. can remove if not nec
  const [selectedMajor, setSelectedMajor] = useState("");
  const handleSelectedMajor = (event, value) => {
    setSelectedMajor(value || "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          label="Post Title"
          variant="standard"
          onChange={handlePostTitleChange}
          error={formErrors.titleError}
          helperText={formErrors.titleError ? "Title is required" : ""}
        />
      </FormControl>
      <FormControl sx={{ marginTop: "30px", width: "100%" }}>
        <InputLabel variant="standard">Post Category</InputLabel>
        <Select
          sx={{ width: "100%" }}
          onChange={handlePostCategoryChange}
          error={formErrors.categoryError}
          helperText={formErrors.categoryError ? "Category is required" : ""}
          label="Post Category"
          variant="standard"
        >
          <MenuItem value={"Study Guide"}>Study Guide</MenuItem>
          <MenuItem value={"Module Review"}>Module Review</MenuItem>
          <MenuItem value={"Notes"}>Notes</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ marginTop: "10px", width: "100%" }}>
        <Autocomplete
          sx={{ marginTop: "20px" }}
          disablePortal
          name="Related Major (if applicable)"
          onChange={handleSelectedMajor}
          options={majorList}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Related Major (if applicable)"
              variant="standard"
            />
          )}
        />
      </FormControl>
      <MyTextEditor />
      <Box sx={{ marginTop: "30px" }}>
        <UploadPostFile allowedTypes={PostFileAllowedTypes} />
      </Box>
      <FormControl sx={{ marginTop: "30px", width: "100%" }}>
        <PostTagsField selectedMajor={selectedMajor} />
      </FormControl>
      <Button
        disabled={!isFormValid}
        sx={{ marginTop: "30px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Create Post
      </Button>
      {submitSuccess && (
        <Snackbar
          open={submitSuccess}
          autoHideDuration={3000}
          onClose={() => setSubmitSuccess(false)}
          message="Post created successfully"
        />
      )}
    </form>
  );
};

// styling for upload post dialog
const UploadPost = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };
  return (
    <div>
      <Tooltip title="Create new Post" placement="top">
        <Fab
          color="primary"
          onClick={handleOpenUpload}
          sx={{
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.1s",
            },
          }}
        >
          <AddRoundedIcon sx={{ fontSize: "30px" }} />
        </Fab>
      </Tooltip>
      <Dialog
        fullScreen
        open={openUpload}
        TransitionComponent={SlideTransition}
      >
        <DialogTitle sx={{ margin: "30px", marginBottom: "0px" }}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "40px", fontWeight: 700 }}>
              New <span style={{ color: "#536DFE" }}>Post</span>
            </Typography>
            <Button
              sx={{ marginLeft: "120ch" }}
              color="error"
              variant="contained"
              onClick={handleCloseUpload}
            >
              Cancel
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ margin: "30px" }}>
          <UploadPostForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPost;
