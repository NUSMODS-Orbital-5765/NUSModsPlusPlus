// OTHER NOTES FOR STYLING: use nativeselect
// TODO: include recently searched for the search bar
import {
  Slide,
  Fab,
  Tooltip,
  Box,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded"; // for back to top button
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { useNavigate } from "react-router-dom";

// sliding upwards transition
export const SlideUpTransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// logo for signin/signup
export const LogoComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        marginBottom: "20px",
      }}
    >
      <img src="nusmods_logo_white.png" style={{ width: "30%" }} />
      <Typography
        variant="h1"
        sx={{
          marginTop: "-100px",
          fontSize: "15px",
          fontWeight: 300,
        }}
      >
        A new way to plan
      </Typography>
    </Box>
  );
};

// styling for basic page header (no subtitle)
export const PageHeaderNoSubtitle = ({ header }) => {
  return (
    <Typography
      sx={{
        marginLeft: "20px",
        marginRight: "20px",
        fontSize: "40px",
        fontWeight: 700,
      }}
    >
      {header}
    </Typography>
  );
};

// styling for page header for each page
export const PageHeader = (props) => {
  const header = props.header;
  const subtitle = props.subtitle;
  return (
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
          marginTop: "100px",
          fontSize: "50px",
          fontWeight: "700",
        }}
      >
        {header}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: "16px",
          fontWeight: 200,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

// styling for Back To Top button
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <Tooltip title="Back to Top" placement="top">
          <Fab color="primary" onClick={scrollToTop}>
            <ArrowUpwardRoundedIcon sx={{ fontSize: "30px" }} />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
};

// styling for a default search bar
// needs logic for displaying searches
export const SearchBar = (props) => {
  const navigate = useNavigate();
  const label = props.label;
  const searchRecommendations = props.searchRecommendations;
  const width = props.width;

  // navigate to the respective page
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const selectedOption = event.target.value;
      const matchedOption = searchRecommendations.find(
        (option) => option.option === selectedOption
      );
      if (matchedOption) {
        navigate(matchedOption.link);
      }
    }
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
      <SearchRoundedIcon
        sx={{ marginTop: "20px", marginRight: "10px", color: "text.primary" }}
      />
      <Autocomplete
        freeSolo
        options={searchRecommendations}
        getOptionLabel={(option) => option.option}
        renderInput={(params) => (
          <TextField
            sx={{ width: { width } }}
            {...params}
            label={label}
            margin="normal"
            variant="standard"
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </Box>
  );
};

// styling for multiple tabs view (use icon to switch between tabs)
export const MultipleTabsView = (props) => {
  const { viewList } = props.viewList;
  const tabContentList = props.tabContentList;
  const maxViewIndex = viewList.length - 1;
  const [currentView, setCurrentView] = useState(0);

  const handlePrevView = () => {
    currentView === 0
      ? setCurrentView(maxViewIndex)
      : setCurrentView(currentView - 1);
  };

  const handleNextView = () => {
    currentView === maxViewIndex
      ? setCurrentView(0)
      : setCurrentView(currentView + 1);
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
      <Tooltip title="Switch to previous view">
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              transform: "translateX(-5px)",
              transition: "transform 0.1s",
            },
          }}
          onClick={handlePrevView}
        >
          <NavigateBeforeRoundedIcon
            sx={{
              color: "#536DFE",
              fontSize: "40px",
            }}
          />
        </IconButton>
      </Tooltip>
      <PageHeaderNoSubtitle header={viewList[currentView]} />
      <Tooltip title="Switch to next view">
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
              transform: "translateX(5px)",
              transition: "transform 0.1s",
            },
          }}
          onClick={handleNextView}
        >
          <NavigateNextRoundedIcon
            sx={{
              color: "#536DFE",
              fontSize: "40px",
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
