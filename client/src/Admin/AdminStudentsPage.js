import { Box, Button, Typography } from "@mui/material";
import { facultyList, progsList, acadPlanList } from "../Constants";
import { adminSampleProfile, sampleStudentsList } from "./AdminConstants";
import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";
import React, { useState, useEffect } from "react";
import { FormAutocomplete } from "../FormStyledComponents";
import StudentDataGrid from "./StudentDataGrid";
import axios from "axios";
// styling for admin students page
const AdminStudentsPage = () => {
  // change the search query from database i think?
  const [filters, setFilters] = useState({
    facultyFilter: "",
    acadFilter: "",
    programmeFilter: "",
  });
  const [filterCount, setFilterCount] = useState(0)
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const department = localStorage.getItem("department");
  // check if admin signed up under faculty or special programme
  function checkAdminDepartment(department) {
    if (facultyList.includes(department)) {
      return "faculty";
    } else if (progsList.includes(department)) {
      return "programme";
    } else {
      return "";
    }
  }

  // only on first load of the page since dependency array is empty
  useEffect(() => {
    if (checkAdminDepartment(department) === "faculty") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        facultyFilter: department,
      }));
    } else if (checkAdminDepartment(department) === "programme") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        programmeFilter: department,
      }));
    }
  }, []);

  useEffect(()=>{
    const adminModulePlanGetAPI = `${process.env.REACT_APP_API_LINK}/admin/get-profile-with-filter`
    axios
    .post(adminModulePlanGetAPI, filters)
    .then(response => {
      setFilteredProfiles(response.data.result.map(e=>{
        let profile = e.owner;
        profile["status"]=e.status;
        profile["semesterModulesDict"]=e.semesterModulesDict;
        profile["nanoid"]=e.nanoid;
        return profile;}))
    })
    .catch(error=>console.log(error))
  },[filterCount])

 

  const handleSetFilter = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmitFilter = () => {
    setFilterCount(filterCount+1)
  };

  // main page component
  return (
    <div>
      <AdminAppBar />
      <AdminDrawerComponent defaultTab={2} />
      <Box className="remainingViewport">
        <Box
          sx={{
            margin: "55px",
            marginTop: "20px",
            borderRadius: "10px",
            backgroundColor: "#e7f2ff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box sx={{ margin: "30px" }}>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "40px",
                fontWeight: "700",
                color: "#004d80",
              }}
            >
              Plan validation made easy.
            </Typography>
            <Typography
              sx={{
                marginBottom: "30px",
                fontSize: "17px",
                color: "#004d80",
              }}
            >
              Apply custom database filters, view students' module plans, and
              approve or reject plans with ease.
            </Typography>
          </Box>
          <img src="/admin-students-icon.png" style={{ width: "40%" }} />
        </Box>
        <Box sx={{ margin: "55px" }}>
          <Box
            sx={{
              marginBottom: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <FormAutocomplete
              optionsList={facultyList}
              setfn={handleSetFilter}
              name="facultyFilter"
              label="Filter by Faculty"
              defaultText={
                checkAdminDepartment(department) === "faculty"
                  ? department
                  : ""
              }
            />
            <Box sx={{ width: "100%", marginLeft: "20px" }}>
              <FormAutocomplete
                optionsList={progsList}
                setfn={handleSetFilter}
                name="programmeFilter"
                label="Filter by Programme"
                defaultText={
                  checkAdminDepartment(department) === "programme"
                    ? department
                    : ""
                }
              />
            </Box>
            <Box sx={{ width: "100%", marginLeft: "20px" }}>
              <FormAutocomplete
                optionsList={acadPlanList}
                setfn={handleSetFilter}
                name="acadFilter"
                label="Filter by Academic Plan"
              />
            </Box>
            <Button
              sx={{ marginLeft: "20px" }}
              variant="contained"
              onClick={handleSubmitFilter}
              disabled={!filters}
            >
              Go
            </Button>
          </Box>
          <StudentDataGrid studentList={filteredProfiles} />
        </Box>
      </Box>
    </div>
  );
};

export default AdminStudentsPage;
