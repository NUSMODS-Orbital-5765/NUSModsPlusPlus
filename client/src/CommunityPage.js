//COMPLETE
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";
import UploadPost from "./UploadPost";
import PostsGrid from "./PostsGrid";
import {
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@mui/material";
import { samplePosts } from "./Constants";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

// styling for main page
const CommunityPage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={5} />
      <Box
        className="remainingViewport"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography
            sx={{
              marginTop: "150px",
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            Community
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "16px",
              fontWeight: 200,
            }}
          >
            A collection of the best study resources, by{" "}
            <span style={{ color: "#536DFE" }}>you</span>, for{" "}
            <span style={{ color: "#536DFE" }}>you</span>.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton sx={{ marginTop: "40px" }}>
              <SearchRoundedIcon />
            </IconButton>
            <TextField
              sx={{
                width: "70ch",
                marginTop: "20px",
                borderRadius: "5px",
              }}
              variant="standard"
              label="Search post titles or tags..."
            ></TextField>
          </Box>
          <UploadPost />
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ marginLeft: "-300px" }}>
            <InputLabel variant="standard">Sort By</InputLabel>
            <NativeSelect>
              <option value={"timestamp"}>Latest</option>
              <option value={"category"}>Category</option>
              <option value={"liked"}>Liked</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Box
          sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
        >
          <PostsGrid postsList={samplePosts} />
        </Box>
      </Box>
    </div>
  );
};

export default CommunityPage;
