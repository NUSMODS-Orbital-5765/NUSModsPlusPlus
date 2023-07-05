// sign up page for admin
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { LogoComponent } from "../StyledComponents";
import { CarouselComponent } from "../StyledComponents";

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
    title="Plan well, Score well."
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

export const WelcomeCarousel = () => {
  return (
    <Box sx={{ backgroundColor: "#e7f2ff" }}>
      <CarouselComponent
        slides={WelcomeMessageCarousel}
        fontSize="50px"
        position="50%"
      />
    </Box>
  );
};

// admin sign up component
const AdminSignUpPage = () => {
  return (
    <Box
      sx={{
        margin: "-10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "100vh",
        }}
      >
        <WelcomeCarousel />
      </Box>

      <Box sx={{ width: "60%" }}>
        <LogoComponent />
        <Card sx={{ borderRadius: "10px", marginTop: "20px" }}>
          <CardContent sx={{ margin: "20px" }}>
            <Typography
              sx={{ marginBottom: "20px", fontWeight: "700", fontSize: "50px" }}
            >
              Welcome! Let's get you settled.
            </Typography>
            <TextField fullWidth label="Username" variant="outlined" />
            <TextField fullWidth label="Password" variant="outlined" />
            <TextField fullWidth label="Confirm Password" variant="outlined" />
            <TextField fullWidth label="Recovery Email" variant="outlined" />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminSignUpPage;
