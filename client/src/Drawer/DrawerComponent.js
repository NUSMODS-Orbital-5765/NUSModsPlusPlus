//COMPLETE
import { Drawer, Typography, Divider, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../Home/HomePageStyledComponents";

// main menu
const DrawerComponent = ({ defaultTab, tabsList }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const handleSelectTab = (event, value) => {
    setSelectedTab(value);
  };

  // map function which renders menu items as tabs
  function mapMenuTabs(items) {
    return (
      <Tabs
        value={selectedTab}
        onChange={handleSelectTab}
        orientation="vertical"
      >
        {items.map((item, index) => {
          if (item.isDivider) {
            return <Divider light key={index} />;
          } else if (item.isSectionHeader) {
            return <SectionHeader text={item.text} />;
          } else {
            return (
              <Tab
                key={index}
                value={index}
                component={Link}
                to={item.link}
                onClick={item.actionOnClick}
                sx={{
                  borderRadius: "5px",
                  marginTop: "10px",
                  marginLeft: "25px",
                  textTransform: "none",
                  alignItems: "flex-start",
                  backgroundColor:
                    selectedTab === index ? "#e7f2ff" : "inherit",
                }}
                label={
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: selectedTab === index ? "#1a90ff" : "text.primary",
                    }}
                    role="heading"
                  >
                    {item.icon}
                    <span style={{ marginLeft: "15px" }}>{item.text}</span>
                  </Typography>
                }
              ></Tab>
            );
          }
        })}
      </Tabs>
    );
  }

  // returns main menu component
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          borderColor: "#f2f5f9",
        },
      }}
    >
      <img
        src="/nusmods_logo.png"
        alt="nusmods_logo"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "-30px",
          marginBottom: "-30px",
          width: "200px",
          height: "auto",
        }}
      />
      <Divider light />
      {mapMenuTabs(tabsList)}
    </Drawer>
  );
};

export default DrawerComponent;
