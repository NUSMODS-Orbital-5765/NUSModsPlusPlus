//COMPLETE
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  TextField,
  Slide,
  FormControl,
  MenuItem,
  InputLabel,
  Autocomplete,
  Chip,
  Fab,
  Tooltip,
} from "@mui/material";
import Input from "@mui/base/Input";
import { majorList, postTagsList } from "./Constants";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./App.css";

// sliding transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// text editor for post
const MyTextEditor = () => {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "list",
    "bullet",
  ];

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <Box sx={{ marginTop: "30px" }} className="my-text-field">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={quillModules}
        formats={quillFormats}
      />
    </Box>
  );
};

// styling for file upload for post
export const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSelectedFile = (event) => {
    const file = event.target.files[0];
    if (file && validateFileType(file)) {
      setSelectedFile(file);
      setErrorMessage(false);
    } else {
      setSelectedFile(null);
      setErrorMessage(true);
    }
  };

  const validateFileType = (file) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "video/mp4",
    ];
    return allowedTypes.includes(file.type);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "30px",
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
      {errorMessage && (
        <Typography color="error">
          Invalid File Type. File must end in .PDF, .JPEG, .PNG, .JPG or .MP4.
        </Typography>
      )}
      {selectedFile && (
        <Typography sx={{ fontWeight: 600 }}>{selectedFile.name}</Typography>
      )}
    </Box>
  );
};

// styling for tags field for post
export const TagsField = () => {
  const [myTags, setMyTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagsList, setTagsList] = useState(postTagsList);
  const [openNewTagDialog, setOpenNewTagDialog] = useState(false);

  const handleTags = (event) => {
    setMyTags(event.target.value);
  };

  const handleNewTag = () => {
    if (newTag.trim() !== "") {
      setTagsList([...tagsList, newTag]);
      setMyTags([...myTags, newTag]);
      setNewTag("");
    }
  };

  const handleNewTagChange = (event) => {
    setNewTag(event.target.value);
  };

  const handleOpenNewTagDialog = () => {
    setOpenNewTagDialog(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <FormControl sx={{ width: "50%" }}>
        <InputLabel variant="standard">
          Add some tags to help others find your post!
        </InputLabel>
        <Select
          multiple
          name="tags"
          value={myTags}
          variant="standard"
          onChange={handleTags}
          label="My Tags"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected &&
                selected.length > 0 &&
                selected.map((tag, index) => (
                  <Chip
                    variant="filled"
                    color="primary"
                    sx={{ margin: "5px" }}
                    key={index}
                    label={tag}
                  />
                ))}
            </Box>
          )}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {tagsList.map((tag, index) => (
            <MenuItem key={index} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          marginLeft: "50px",
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleOpenNewTagDialog}>
          New Tag:
        </Button>
        {openNewTagDialog && (
          <Box
            sx={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "50ch" }}
              variant="standard"
              label="Tag Name"
              onChange={handleNewTagChange}
            />
            <Button
              sx={{ marginLeft: "30px" }}
              color="success"
              variant="outlined"
              onClick={handleNewTag}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// styling for post upload form component
export const UploadPostForm = () => {
  // placeholder for actual post upload feature
  const handleSubmit = () => {
    console.log("submitted!");
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
      <UploadFile />
      <FormControl sx={{ marginTop: "30px", width: "100%" }}>
        <TagsField />
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
          size="large"
          sx={{
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.1s",
            },
          }}
        >
          <AddRoundedIcon />
        </Fab>
      </Tooltip>
      <Dialog fullScreen open={openUpload} TransitionComponent={Transition}>
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
