import DrawerComponent from "../DrawerComponent";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const AdminDrawerComponent = ({ defaultTab }) => {
  // logout action
  const logOut = () => {
    localStorage.clear();
  };

  // list of main menu sections
  const adminDashboardItems = Array(
    {
      text: "Home",
      icon: <HomeRoundedIcon sx={{ fontSize: "30px" }} />,
      link: "/admin",
    },
    {
      text: "Students",
      icon: <FaceRoundedIcon sx={{ fontSize: "30px" }} />,
      link: "/admin/students",
    }
  );

  // list of user menu sections
  const adminGeneralItems = Array(
    {
      text: "Profile",
      icon: <SettingsRoundedIcon sx={{ fontSize: "30px" }} />,
      link: "/profile",
    },
    {
      text: "Logout",
      icon: <LogoutRoundedIcon sx={{ fontSize: "30px" }} />,
      link: "/sign-in",
      actionOnClick: logOut,
    }
  );

  // list of all menu sections
  const adminCombinedItems = [
    { text: "DASHBOARD", isSectionHeader: true },
    ...adminDashboardItems,
    { text: "divider", isDivider: true },
    { text: "GENERAL", isSectionHeader: true },
    ...adminGeneralItems,
  ];

  return (
    <DrawerComponent defaultTab={defaultTab} tabsList={adminCombinedItems} />
  );
};

export default AdminDrawerComponent;
