import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const drawerItems = Array(
  { text: "Dashboard", icon: <SpaceDashboardRoundedIcon /> },
  { text: "Planner", icon: <CalendarMonthRoundedIcon /> },
  { text: "Modules", icon: <LibraryBooksRoundedIcon /> },
  { text: "My GPA", icon: <CalculateRoundedIcon /> },
  { text: "Forum", icon: <ChatRoundedIcon /> }
);

function DrawerComponent() {
  return (
    <Drawer className="drawer-component" variant="permanent" anchor="left">
      <Box width={240} display="flex" flexDirection="column" height="100%">
        <div style={{ flex: "0 0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="nusmods.png"
              alt="nusmods"
              style={{ width: "90%", marginTop: "15px" }}
            />
          </div>
          <div style={{ flex: "1 1 auto", overflow: "auto" }}>
            <List>
              {drawerItems.map((item) => (
                <ListItem>
                  <ListItemButton sx={{ borderRadius: "10px" }}>
                    <ListItemIcon style={{ color: "black" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}
// each drawer component should have the same layout, with nusmods icon at the top

export default DrawerComponent;

//TODO: each button should be darkened to show which page the user is currently at
