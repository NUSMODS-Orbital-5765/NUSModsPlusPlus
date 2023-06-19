import { formatDistanceToNow } from "date-fns";

// list of nus faculties
export const facultyList = [
  "Faculty of Arts and Social Sciences",
  "School of Business",
  "School of Computing",
  "College of Design and Engineering",
  "Faculty of Law",
  "Faculty of Science",
  "Yong Siew Toh Conservatory of Music",
];

// dictionary of nus majors by faculty
export const majorDict = {
  "Faculty of Arts and Social Sciences": [
    "Chinese Language",
    "Chinese Studies",
    "Communications and New Media",
    "Economics",
    "English Language and Linguistics",
    "English Literature",
    "Geography",
    "Global Studies",
    "History",
    "Japanese Studies",
    "Malay Studies",
    "Philosophy",
    "Political Science",
    "Psychology",
    "Social Work",
    "Sociology",
    "South Asian Studies",
    "Southeast Asian Studies",
    "Theatre and Performance Studies",
    "Philosophy, Politics, and Economics (PPE)",
    "Anthropology",
  ],
  "School of Business": [
    "Business Administration",
    "Accountancy",
    "Real Estate",
    "Management",
    "Entrepreneurship",
  ],
  "School of Computing": [
    "Computer Science",
    "Information Systems",
    "Business Analytics",
    "Information Security",
    "Computer Engineering",
  ],
  "College of Design and Engineering": [
    "Architecture",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Engineering Science",
    "Environmental Engineering",
    "Industrial Design",
    "Industrial Systems Engineering",
    "Infrastructure & Project Management",
    "Landscape Architecture",
    "Materials Science and Engineering",
    "Mechanical Engineering",
  ],
  "Faculty of Law": ["Law"],
  "Faculty of Science": [
    "Chemistry",
    "Data Science and Analytics",
    "Data Science and Economics",
    "Environmental Studies",
    "Food Science and Technology",
    "Life Sciences",
    "Mathematics",
    "Pharmaceutical Science",
    "Pharmacy",
    "Physics",
    "Quantitative Finance",
    "Statistics",
  ],
  "Yong Siew Toh Conservatory of Music": ["Music"],
};

// list of nus majors
export const majorList = Array.from(new Set(Object.values(majorDict).flat()));

// list of special programmes available (tbc, include scholarships)
export const progsList = ["SEP", "NOC", "UTCP", "RVRC", "NUS College"];

export const interestsDict = {
  "module related": ["easy to score", "light workload"],
  "career progression": ["internship", "research"],
  business: ["management", "finance"],
  computing: ["machine-learning", "OOP", "data analysis"],
};

// sample personal details for user profile setup. meant to extract from database
export const sampleProfile = {
  Name: "Hannah Tan",
  StudentID: "A1234567B",
  Username: "h_student",
  Password: "h_student_1",
  Faculty: "School of Computing",
  Major: "Information Systems",
  "Second Major": "Economics",
  Minor: "", // or null?
  "Special Programme": "RVRC",
  Interests: ["easy to score", "finance", "machine learning"],
};

// samplePosts list should be updated when a new post is uploaded.
// posts should take note of the time and author upon upload.
export const currentDay = new Date();
export const nextDay = new Date();
nextDay.setDate(currentDay.getDate() + 1);
export const followingDay = new Date();
followingDay.setDate(nextDay.getDate() + 1);

// each post should have a list of comments, but i'm just using one comment list for each post for simplicity
export const sampleComments = [
  {
    timestamp: currentDay,
    content:
      "Curabitur lacinia commodo metus, sed varius felis scelerisque eu. In sit amet nibh sem. Vivamus nec aliquam sapien, eu semper dolor. Duis rhoncus vulputate cursus. In vel gravida orci, et dapibus nunc. Praesent eu erat porta, varius tellus in, vulputate mi. Pellentesque dapibus turpis velit, vitae convallis nisi porttitor sit amet. Cras a posuere metus, pharetra facilisis justo.",
    author: "ryan123",
    avatar: "profilepic_1.png",
  },
  {
    timestamp: nextDay,
    content: "Nullam egestas at ex nec fermentum. Cras a tellus quis.",
    author: "nam1nam",
    avatar: "profilepic_1.png",
  },
  {
    timestamp: followingDay,
    content:
      "Duis tincidunt nec est id efficitur. Ut porttitor fermentum dictum.",
    author: "joannee",
    avatar: "profilepic_2.png",
  },
];

export const samplePosts = [
  {
    timestamp: currentDay, // it's not in the form, but should record time and date of upload once button is pressed
    title: "Recent changes to the MA2001 curriculum",
    category: "Study Guide",
    related_major: "Mathematics",
    content:
      "Maecenas tempor ipsum a posuere consectetur. Nunc sodales, eros vitae porta vulputate, turpis dolor accumsan libero, a molestie neque enim sollicitudin felis. Nulla dictum, lectus vitae egestas semper, est magna.",
    upload_file: "", // possible to store the filepreviewURL so can download the file on click?
    tags: ["Mathematics", "homework"],
    author: "ryan123", // this should be a user object, which connects to a profile (will set up later lol)
    avatar: "profilepic_1.png", // this should be stored as a filepreviewURL (as above) and linked to user profile directly
    likes: 195,
    comments: 5,
  },
  {
    timestamp: nextDay,
    title: "Mindmaps that I used for EC1101E revision",
    category: "Notes",
    related_major: "Economics",
    content:
      "Fusce cursus ipsum magna, sit amet facilisis erat maximus et. Nunc accumsan placerat finibus. Pellentesque congue lectus ac leo vestibulum, non luctus felis consectetur. Cras pulvinar odio libero, vel vestibulum.",
    upload_file: "EconsNotes.pdf",
    tags: ["Economics", "homework", "homework help"],
    author: "nam1nam",
    avatar: "profilepic_1.png",
    likes: 200,
    comments: 1,
  },
  {
    timestamp: followingDay,
    title: "Why is CS2040 so hard??",
    category: "Module Review",
    related_major: "Computer Science",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam rhoncus congue nibh, dapibus varius mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
    upload_file: "",
    tags: ["Computer Science", "csmods", "java"],
    author: "joannee",
    avatar: "profilepic_2.png",
    likes: 39,
    comments: 3,
  },
  {
    timestamp: followingDay,
    title: "Why is CS2040 so hard??",
    category: "Module Review",
    related_major: "Computer Science",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam rhoncus congue nibh, dapibus varius mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
    upload_file: "",
    tags: ["Computer Science", "csmods", "java"],
    author: "joannee",
    avatar: "profilepic_2.png",
    likes: 39,
    comments: 3,
  },
  {
    timestamp: followingDay,
    title: "Why is CS2040 so hard??",
    category: "Module Review",
    related_major: "Computer Science",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam rhoncus congue nibh, dapibus varius mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
    upload_file: "",
    tags: ["Computer Science", "csmods", "java"],
    author: "joannee",
    avatar: "profilepic_2.png",
    likes: 39,
    comments: 3,
  },
  {
    timestamp: nextDay,
    title: "Mindmaps that I used for EC1101E revision",
    category: "Notes",
    related_major: "Economics",
    content:
      "Fusce cursus ipsum magna, sit amet facilisis erat maximus et. Nunc accumsan placerat finibus. Pellentesque congue lectus ac leo vestibulum, non luctus felis consectetur. Cras pulvinar odio libero, vel vestibulum.",
    upload_file: "EconsNotes.pdf",
    tags: ["Economics", "homework", "homework help"],
    author: "nam1nam",
    avatar: "profilepic_1.png",
    likes: 200,
    comments: 1,
  },
];

// tags category list
export const postTagsList = ["finance", "business", "econs", "homework"];

// post recommendations list for community search bar
const samplePostsTags = new Set();
samplePosts.forEach((post) => {
  post.tags.forEach((tag) => {
    samplePostsTags.add(tag);
  });
});
export const postRecommendations = Array.from(samplePostsTags);

// function for date formatting (feel free to change if nec)
export const formatDate = (dateTime) => {
  return formatDistanceToNow(dateTime, { addSuffix: true });
};

// sample notifs list
export const notifsList = [
  {
    timestamp: currentDay,
    avatar: "profilepic_2.png",
    author: "admin 1",
    content: "You are not approved for exemption from MA2001.",
    type: "comment",
  },
  {
    timestamp: nextDay,
    avatar: "profilepic_1.png",
    author: "admin 2",
    content: "You are missing two core modules: BT2101 and BT2102.",
    type: "comment",
  },
  {
    timestamp: followingDay,
    avatar: "profilepic_2.png",
    author: "admin 3",
    content: "Your 2022/2023 Sem 1 Plan is successful.",
    type: "approve",
  },
];

// list of possible views
export const GPACalculatorViewList = ["By Year", "Overall GPA"];

// list of letter grades and their respective GPAs
export const GPAGradeGuide = [
  { grade: "A+", GPA: "5.0" },
  { grade: "A", GPA: "5.0" },
  { grade: "A-", GPA: "4.5" },
  { grade: "B+", GPA: "4.0" },
  { grade: "B", GPA: "3.5" },
  { grade: "B-", GPA: "3.0" },
  { grade: "C+", GPA: "2.5" },
  { grade: "C", GPA: "2.0" },
  { grade: "D+", GPA: "1.5" },
  { grade: "D", GPA: "1.0" },
  { grade: "F", GPA: "0" },
];

// list of all possible grades
export const PossibleGradesList = GPAGradeGuide.map((item) => item.grade);

// list of semesters and their modules
export const sampleSemesterModules = [
  {
    year: "22/23",
    semesters: {
      "Semester 1": [
        { moduleCode: "MA1521", grade: "A+", "S/U": "Yes" },
        { moduleCode: "BT1101", grade: "A", "S/U": "Yes" },
        { moduleCode: "CS1010S", grade: "A-", "S/U": "Yes" },
        { moduleCode: "NSW2001", grade: "B", "S/U": "Yes" },
        { moduleCode: "NGN2001", grade: "B-", "S/U": "Yes" },
      ],
      "Semester 2": [
        { moduleCode: "EC1101E", grade: "F", "S/U": "Yes" },
        { moduleCode: "MA2001", grade: "A+", "S/U": "Yes" },
        { moduleCode: "BT2102", grade: "A+", "S/U": "No" },
        { moduleCode: "CS2030", grade: "C+", "S/U": "No" },
        { moduleCode: "NTW2004", grade: "A+", "S/U": "No" },
      ],
    },
  },
  {
    year: "23/24",
    semesters: {
      "Semester 1": [
        { moduleCode: "CS2040", grade: "A", "S/U": "No" },
        { moduleCode: "EC3303", grade: "A", "S/U": "No" },
        { moduleCode: "BT2101", grade: "A+", "S/U": "No" },
        { moduleCode: "NHS2006", grade: "B+", "S/U": "Yes" },
        { moduleCode: "QF1100", grade: "A", "S/U": "Yes" },
      ],
    },
  },
];

// honours classification and corresponding gpa
export const HonoursGPAGuide = {
  "Honours (Highest Distinction)": 4.5,
  "Honours (Distinction)": 4.0,
  "Honours (Merit)": 3.5,
  Honours: 3.0,
  Pass: 2.0,
};

// list of all possible semesters
export const PossibleSemestersList = [
  "Semester 1",
  "Semester 2",
  "Special Term 1",
  "Special Term 2",
];
