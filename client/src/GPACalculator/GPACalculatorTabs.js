import { Box, Tabs, Tab, Typography, Card, CardContent } from "@mui/material";
import { sampleSemesterModules, HonoursGPAGuide } from "../Constants";
import { DefaultNativeSelect } from "../FormStyledComponents";
import React, { useState } from "react";
import { emptyModuleGrades } from "./GPACalculatorConstants";
import ModuleDataGrid from "./ModuleDataGrid";

// component for switching between different views
const GPACalculatorTabs = ({ gradesList }) => {
  const [activeTab, setActiveTab] = useState(0); // always start with the "Year 1" view
  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <Card
      sx={{
        minHeight: "80ch",
        borderRadius: "10px",
        marginTop: "-10px",
        marginBottom: "50px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ margin: "15px" }}>
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
              justifyItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "35px", fontWeight: 700 }}>
              My Grades
            </Typography>
            <Box sx={{ marginLeft: "30px" }}>
              <DefaultNativeSelect // make sure you change this to a normal select field later on
                optionsDict={HonoursGPAGuide}
                label="Grade Target"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Tabs value={activeTab} onChange={handleChangeTab}>
            {gradesList.map((yearObject, index) => (
              <Tab
                value={index}
                sx={{ fontWeight: activeTab === index ? 600 : 500 }}
                label={yearObject.year}
              />
            ))}
          </Tabs>
        </Box>
        {gradesList[activeTab]?.semesters &&
          Object.entries(gradesList[activeTab].semesters).map(
            ([semester, modules], index) => (
              <div key={index}>
                <ModuleDataGrid semesterName={semester} moduleList={modules} />
              </div>
            )
          )}
      </CardContent>
    </Card>
  );
};

export default GPACalculatorTabs;
