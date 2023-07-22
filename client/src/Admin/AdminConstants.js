import { today, yesterday, twoDaysAgo, tomorrow } from "../Constants";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { majorDict } from "../Constants";
import { format } from "date-fns";
import { recommendedPlanLayout } from "../Modules/ModuleConstants";

// shortcuts for searchbar for admin user interface
export const adminRecommendations = [
  { option: "back to home", link: "/admin" },
  { option: "view module plans", link: "/admin/students" },
  { option: "edit profile", link: "/admin/profile" },
  { option: "change username", link: "/admin/profile/account" },
  { option: "change password", link: "/admin/profile/account" },
  { option: "change email", link: "/admin/profile/account" },
  { option: "logout", link: "/sign-in" },
];

// list of student profiles to be mapped to admin notifications
export const sampleStudentsList = [
  {
    name: "Hannah Tan",
    avatar: "/sample_icon.png",
    studentId: "e2244668",
    username: "hannah_tan",
    password: "hannah123",
    email: "hannah@gmail.com",
    faculty: "School of Computing",
    primaryDegree: "Information Systems",
    secondDegree: "",
    secondMajor: "Economics",
    minor: ["Geography", "History", "Statistics", "Mathematics"],
    programme: "RVRC",
  },
  {
    name: "Ryan Wong",
    avatar: "/profilepic_1.png",
    studentId: "e5557777",
    username: "ryan123",
    password: "ryan123",
    email: "ryan_wong@gmail.com",
    faculty: "School of Business",
    primaryDegree: "Business Administration",
    secondDegree: "Economics",
    secondMajor: "",
    minor: ["Statistics", "Mathematics"],
    programme: "NUS College",
  },
  {
    name: "Nguyen Xuan Nam",
    avatar: "/profilepic_1.png",
    studentId: "e1234567",
    username: "nam1nam",
    password: "nam123",
    email: "namnam@gmail.com",
    faculty: "Faculty of Science",
    primaryDegree: "Data Science and Analytics",
    secondDegree: "",
    secondMajor: "Computer Science",
    minor: ["Mathematics"],
    programme: "",
  },
];

// function to check if the module plans have been approved
export const sampleStudentsModules = [
  {
    studentId: "e1234567",
    planStatus: "Approved",
    modules: recommendedPlanLayout,
  },
  {
    studentId: "e5557777",
    planStatus: "Rejected",
    modules: recommendedPlanLayout,
  },
  {
    studentId: "e2244668",
    planStatus: "Pending",
    modules: recommendedPlanLayout,
  },
];

// join student with module table to find students' modules
export function checkStudentModules(studentProfile) {
  if (studentProfile) {
    const matchingPlan = sampleStudentsModules.find(
      (module) => module.studentId === studentProfile.studentId
    );

    return matchingPlan ? matchingPlan.modules : {};
  } else {
    return {};
  }
}

// match the student profile link with the student module database to check for the module plan status
// i assume the database format also have join table like this right
export function checkPlanStatus(studentProfile) {
  if (studentProfile) {
    const matchingPlan = sampleStudentsModules.find(
      (module) => module.studentId === studentProfile.studentId
    );
    return matchingPlan ? matchingPlan.planStatus : "";
  } else {
    return "";
  }
}

// list of notifications to be mapped for admin user interface
export const adminNotifsList = [
  {
    student: sampleStudentsList[0],
    content: "You are missing modules MA2001 and MA1521.",
    type: "mention",
    timestamp: today,
  },
  {
    student: sampleStudentsList[1],
    content: "",
    type: "approve",
    timestamp: yesterday,
  },
  {
    student: sampleStudentsList[1],
    content: "Your plan looks great! Well done!",
    type: "mention",
    timestamp: yesterday,
  },
  {
    student: sampleStudentsList[2],
    content: "",
    type: "approve",
    timestamp: twoDaysAgo,
  },
  {
    student: sampleStudentsList[0],
    content:
      "You are missing some Economics core modules. Please refer to the second major requirements here: https://fass.nus.edu.sg/ecs/academic-year-2021-22-and-after-2/",
    type: "mention",
    timestamp: twoDaysAgo,
  },
];

// sample admin profile
export const adminSampleProfile = {
  name: "Admin 1",
  avatar: "/sample-admin-icon.png",
  staffId: "s1234567",
  username: "admin_1",
  password: "admin_password!",
  email: "admin1@gmail.com",
  department: "School of Computing",
  position: "Faculty Administrator",
};

// admin user items to be mapped to admin app bar
export const adminAvatarItems = [
  { label: "Profile", icon: <SettingsRoundedIcon />, link: "/admin/profile" },
  { label: "Logout", icon: <LogoutRoundedIcon />, link: "/sign-in" },
];

// today's date and time
const currentDate = new Date();
export const currentDateAndTimeDisplay = format(
  currentDate,
  "EEEE, d MMMM, h:mm a"
);

// get major color based on faculty, if not necessary i will delete this.
const majorColorLookup = {};
for (const faculty in majorDict) {
  const majors = majorDict[faculty];
  for (const major of majors) {
    majorColorLookup[major] = getMajorColorByFaculty(faculty);
  }
}

function getMajorColorByFaculty(faculty) {
  switch (faculty) {
    case "Faculty of Arts and Social Sciences":
      return "error";
    case "Faculty of Science":
      return "success";
    case "School of Business":
      return "default";
    case "School of Computing":
      return "primary";
    case "College of Design and Engineering":
      return "warning";
    default:
      return "white";
  }
}

export function getMajorColor(major) {
  return majorColorLookup[major] || "white";
}

// same data structure as postcomments
export const sampleAdminComments = [
  {
    dateCreated: today,
    content:
      "Curabitur lacinia commodo metus, sed varius felis scelerisque eu. In sit amet nibh sem. Vivamus nec aliquam sapien, eu semper dolor. Duis rhoncus vulputate cursus. In vel gravida orci, et dapibus nunc. Praesent eu erat porta, varius tellus in, vulputate mi. Pellentesque dapibus turpis velit, vitae convallis nisi porttitor sit amet. Cras a posuere metus, pharetra facilisis justo.",
    author: adminSampleProfile,
    avatar: adminSampleProfile,
    // remember search for recipient to match the comments to the right user
  },
  {
    dateCreated: yesterday,
    content: "Nullam egestas at ex nec fermentum. Cras a tellus quis.",
    author: adminSampleProfile,
    avatar: adminSampleProfile,
  },
  {
    dateCreated: twoDaysAgo,
    content:
      "Duis tincidunt nec est id efficitur. Ut porttitor fermentum dictum.",
    author: adminSampleProfile,
    avatar: adminSampleProfile,
  },
];
