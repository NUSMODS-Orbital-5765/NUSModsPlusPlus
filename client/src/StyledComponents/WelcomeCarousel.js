import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// styled carousel component
export const CarouselComponent = ({
  slides,
  fontSize,
  positionTop,
  positionSide,
}) => {
  const CustomPrevButton = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: positionTop,
        left: positionSide ? positionSide : "0px",
        zIndex: 1,
        "&:hover": {
          backgroundColor: "transparent",
          transform: "translateX(5px)",
          transition: "transform 0.1s",
        },
      }}
    >
      <NavigateBeforeRoundedIcon
        sx={{ color: "#1a90ff", fontSize: fontSize }}
      />
    </IconButton>
  );

  const CustomNextButton = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: positionTop,
        right: positionSide ? positionSide : "0px",
        "&:hover": {
          backgroundColor: "transparent",
          transform: "translateX(5px)",
          transition: "transform 0.1s",
        },
      }}
    >
      <NavigateNextRoundedIcon sx={{ color: "#1a90ff", fontSize: fontSize }} />
    </IconButton>
  );

  return (
    <Carousel
      data-testid="carousel-component"
      sx={{ width: "100%", height: "100%" }}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && <CustomPrevButton onClick={onClickHandler} />
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && <CustomNextButton onClick={onClickHandler} />
      }
    >
      {slides}
    </Carousel>
  );
};

// list of welcome messages that we intend to map
export const Intro = ({ title, subtitle, image, width }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#e7f2ff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ margin: "30px" }}>
        <Typography
          sx={{ color: "#004d80", fontSize: "50px", fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: "20px", marginTop: "20px", color: "#004d80" }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <img alt="Sample Icon" src={image} />
      </Box>
    </Box>
  );
};

export const WelcomeMessageCarousel = [
  <Intro
    title="Study smart, not hard."
    subtitle="Join the community today."
    image="/join-icon.png"
  />,
  <Intro
    title="Carefully curated academic resources, created by your peers."
    subtitle="From module reviews, to study notes, to academic guides, we've got it all."
    image="/community-intro.png"
  />,
  <Intro
    title="Schedule tasks and events easily."
    subtitle="Our student-focused planner takes care of all your academic and non-academic needs."
    image="/planner-intro.png"
  />,
  <Intro
    title="Plan your modules correctly and efficiently."
    subtitle="Get study plan recommendations, easily verify programme requirements, and receive admin validation."
    image="/module-intro.png"
  />,
  <Intro
    title="Track your grades easily with our handy GPA calculator."
    subtitle="Get S/U recommendations, calculate semester, yearly and cumulative GPAs, and more."
    image="/calculator-intro.png"
  />,
];

const WelcomeCarousel = () => {
  return (
    <Box sx={{ backgroundColor: "#e7f2ff" }}>
      <CarouselComponent
        slides={WelcomeMessageCarousel}
        fontSize="50px"
        positionTop="50%"
        positionSide="5%"
      />
    </Box>
  );
};

export default WelcomeCarousel;
