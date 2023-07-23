import AppBarComponent from "../AppBar/AppBarComponent";
import DrawerComponent from "../Drawer/DrawerComponent";
import { samplePosts, sampleProfile } from "../Constants";
import { SortAndFilter } from "../Community/CommunityPage";
import PostsList from "../Community/PostsList";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import { combinedItems } from "../Home/HomePageStyledComponents";

// list of information to map
// change this to a mapping function which checks profile fields before mapping
export function AboutInfoList(sampleProfile) {
  // displaying the minor content
  let minorContent = {
    content: <Typography></Typography>,
    icon: <ImportContactsRoundedIcon />,
  };
  if (sampleProfile.minor.length > 0) {
    const formattedContent = (
      <Typography>
        <span style={{ fontWeight: 700 }}>Minor</span> in{" "}
        {sampleProfile.minor.join(", ")}
      </Typography>
    );
    minorContent.content = formattedContent;
  }

  // displaying the degree content
  let degreeContent = {
    content: (
      <Typography>
        <span style={{ fontWeight: 700 }}>Degree</span> in{" "}
        {sampleProfile.primaryDegree}
      </Typography>
    ),
    icon: <AutoStoriesRoundedIcon />,
  };
  if (sampleProfile.secondDegree) {
    degreeContent.content = (
      <Typography>
        <span style={{ fontWeight: 700 }}>Double Degree</span> in{" "}
        {sampleProfile.primaryDegree} and {sampleProfile.secondDegree}
      </Typography>
    );
  } else if (sampleProfile.secondMajor) {
    degreeContent.content = (
      <Typography>
        <span style={{ fontWeight: 700 }}>Double Major</span> in{" "}
        {sampleProfile.primaryDegree} and {sampleProfile.secondMajor}
      </Typography>
    );
  }

  return [
    {
      content: <Typography>{sampleProfile.faculty}</Typography>,
      icon: <LocationOnRoundedIcon />,
    },
    degreeContent,
    sampleProfile.minor.length !== 0 && minorContent,
    sampleProfile.programme && {
      content: <Typography>{sampleProfile.programme}</Typography>,
      icon: <HomeRoundedIcon />,
    },
  ];
}

// public profile header (used for module page)
export const PublicProfileHeader = ({ sampleProfile }) => {
  return (
    <Box
      sx={{
        margin: "55px",
        marginTop: "20px",
        borderRadius: "10px",
        background: `
      linear-gradient(to bottom,  #e7f2ff 80%, #1a90ff 20%),
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
          src={sampleProfile.avatar}
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
            {sampleProfile.name}
          </Typography>
          <Typography sx={{ color: "#004d80" }}>
            Student • {sampleProfile.primaryDegree}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// what others see as your public profile
export const PublicProfileView = ({ sampleProfile }) => {
  return (
    <div>
      <PublicProfileHeader sampleProfile={sampleProfile} />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Card
          sx={{
            borderRadius: "10px",
            margin: "55px",
            marginTop: "-10px",
            marginBottom: "40px",
            backgroundColor: "#f2f2f2",
            boxShadow: 0,
            flex: "20%",
          }}
        >
          <CardContent sx={{ margin: "10px" }}>
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              About
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              {AboutInfoList(sampleProfile).map((infoItem, index) => (
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ marginRight: "10px" }}>{infoItem.icon}</Box>
                  {infoItem.content}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ flex: "60%" }}>
          <SortAndFilter />
          <Box sx={{ marginRight: "55px", marginTop: "40px" }}>
            <PostsList postList={samplePosts} />
            {/* replace with filtered list of posts made by the author */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// main page component
const PublicProfilePage = () => {
  return (
    <div className="homepage">
      <AppBarComponent />
      <DrawerComponent defaultTab={8} tabsList={combinedItems} />
      <Box
        className="remainingViewport"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <PublicProfileView sampleProfile={sampleProfile} />
      </Box>
    </div>
  );
};

export default PublicProfilePage;

// for editable bio field, but not sure if necessary. as of now maybe not
/* edit the bio
  const [editableField, setEditableField] = useState(false);
  const [currentBio, setCurrentBio] = useState(sampleProfile.bio);

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
  */
