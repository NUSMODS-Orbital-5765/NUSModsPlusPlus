import { formatDistanceToNow, addDays } from "date-fns";
import { red, orange, yellow } from "@mui/material/colors";

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
export const acadPlanList = ["Single Degree", "Double Degree", "Double Major"];

export const interestsDict = {
  "module related": ["easy to score", "light workload"],
  "career progression": ["internship", "research"],
  business: ["management", "finance"],
  computing: ["machine-learning", "OOP", "data analysis"],
};

// sample personal details for user profile setup. meant to extract from database
export const sampleProfile = {
  name: "Hannah Tan",
  avatar: "/sample_icon.png",
  studentId: "12345678",
  username: "hannah_tan",
  password: "hannah123",
  email: "hannah@gmail.com",
  faculty: "School of Computing",
  primaryDegree: "Information Systems",
  secondDegree: "",
  secondMajor: "Economics",
  minor: ["Geography", "History"],
  programme: "RVRC",
};

// samplePosts list should be updated when a new post is uploaded.
// posts should take note of the time and author upon upload.
export const today = new Date();
export const yesterday = addDays(today, -1);
export const twoDaysAgo = addDays(today, -2);
export const tomorrow = addDays(today, 1);

// each post should have a list of comments, but i'm just using one comment list for each post for simplicity
export const sampleComments = [
  {
    timestamp: today,
    content:
      "Curabitur lacinia commodo metus, sed varius felis scelerisque eu. In sit amet nibh sem. Vivamus nec aliquam sapien, eu semper dolor. Duis rhoncus vulputate cursus. In vel gravida orci, et dapibus nunc. Praesent eu erat porta, varius tellus in, vulputate mi. Pellentesque dapibus turpis velit, vitae convallis nisi porttitor sit amet. Cras a posuere metus, pharetra facilisis justo.",
    author: "ryan123",
    avatar: "profilepic_1.png",
  },
  {
    timestamp: yesterday,
    content: "Nullam egestas at ex nec fermentum. Cras a tellus quis.",
    author: "nam1nam",
    avatar: "profilepic_1.png",
  },
  {
    timestamp: twoDaysAgo,
    content:
      "Duis tincidunt nec est id efficitur. Ut porttitor fermentum dictum.",
    author: "joannee",
    avatar: "profilepic_2.png",
  },
];

export const samplePosts = [
  {
    dateCreated: today, // it's not in the form, but should record time and date of upload once button is pressed
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
    dateCreated: yesterday,
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
    dateCreated: twoDaysAgo,
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
    dateCreated: twoDaysAgo,
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
    dateCreated: twoDaysAgo,
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
    dateCreated: yesterday,
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
    timestamp: today,
    avatar: "/profilepic_2.png",
    author: "admin 1",
    content: "You are not approved for exemption from MA2001.",
    type: "mention",
    url: "/modules",
    readStatus: false,
  },
  {
    timestamp: twoDaysAgo,
    avatar: "/profilepic_1.png",
    author: "admin 2",
    content: "You are missing two core modules: BT2101 and BT2102.",
    type: "mention",
    url: "/modules",
    readStatus: false,
  },
  {
    timestamp: yesterday,
    avatar: "/profilepic_2.png",
    author: "admin 3",
    content: "",
    type: "approve",
    url: "/modules",
    readStatus: false,
  },
  {
    timestamp: twoDaysAgo,
    avatar: "/profilepic_2.png",
    author: "random_user",
    content: "",
    type: "like",
    url: "/community", // should replace with the actual url
    readStatus: false,
  },
  {
    timestamp: yesterday,
    avatar: "/profilepic_2.png",
    author: "random_user",
    content:
      "Amazing post! Really insightful and covered all the necessary details. On that note, I would like to add that the curriculum board has discussed and intended for the new curriculum to be released much earlier.",
    type: "comment",
    url: "/community",
    readStatus: false,
  },
];

// notifsList with id
export const notifsListWithId = (notifsList) => {
  return notifsList.map((notif, index) => ({
    ...notif,
    id: index,
  }));
};

// honours classification and corresponding gpa
export const HonoursGPAGuide = {
  "Honours (Highest Distinction)": 4.5,
  "Honours (Distinction)": 4.0,
  "Honours (Merit)": 3.5,
  Honours: 3.0,
  Pass: 2.0,
};

// compress these three later on
// list of priorities (only use for events and tasks)
export const priorityList = ["Very High", "High", "Average", "Low"];

// list of priorities and respective colors
export const priorityColors = {
  4: red[500],
  3: orange[500],
  2: yellow[500],
  1: "#44b700",
};

// list of priorities and respective values
export const priorityValues = {
  "Very High": 4,
  High: 3,
  Average: 2,
  Low: 1,
};

// list of sample day events for homepage timetable
export const sampleDayEvents = [
  {
    name: "Lunch with Lauren",
    date: "22-06-2003",
    time: "12:30 PM",
    category: "Personal",
    priority: 1,
  },
  {
    name: "CS2030 Lab",
    date: "22-06-2003",
    time: "2:00 PM",
    category: "CS2030",
    priority: 4,
  },
  {
    name: "Team Meeting",
    date: "22-06-2003",
    time: "5:00 PM",
    category: "Personal",
    priority: 3,
  },
  {
    name: "Suite Dinner",
    date: "22-06-2003",
    time: "6:00 PM",
    category: "Personal",
    priority: 1,
  },
  {
    name: "Submit NTW essay",
    date: "22-06-2003",
    time: "11:00 PM",
    category: "NTW2004",
    priority: 4,
  },
];

// list of sample week events for homepage timetable
// need to extract from database
export const sampleWeekEvents = [
  {
    day: "Monday",
    events: [
      {
        name: "Lunch",
        date: "19-06-2003",
        time: "12:30 PM",
        category: "Personal",
        priority: 1,
      },
      {
        name: "MA2001 Tutorial",
        date: "19-06-2003",
        time: "2:00 PM",
        category: "MA2001",
        priority: 4,
      },
      {
        name: "Dinner with Amy",
        date: "19-06-2003",
        time: "5:00 PM",
        category: "Personal",
        priority: 1,
      },
    ],
  },
  {
    day: "Tuesday",
    events: [
      {
        name: "BT2102 Lab",
        date: "20-06-2003",
        time: "1:00 PM",
        category: "BT2102",
        priority: 3,
      },
      {
        name: "NTW Lesson",
        date: "20-06-2003",
        time: "4:00 PM",
        category: "NTW2004",
        priority: 3,
      },
      {
        name: "Dinner",
        date: "20-06-2003",
        time: "6:30 PM",
        category: "Personal",
        priority: 1,
      },
    ],
  },
  {
    day: "Wednesday",
    events: [
      {
        name: "Consult with Prof",
        date: "21-06-2003",
        time: "1:00 PM",
        category: "NTW2004",
        priority: 3,
      },
      {
        name: "EC1101 tutorial 9",
        date: "21-06-2003",
        time: "4:00 PM",
        category: "EC1101E",
        priority: 3,
      },
    ],
  },
  {
    day: "Thursday",
    events: [
      {
        name: "Lunch with Lauren",
        date: "22-06-2003",
        time: "12:30 PM",
        category: "Personal",
        priority: 1,
      },
      {
        name: "CS2030 Lab",
        date: "22-06-2003",
        time: "2:00 PM",
        category: "CS2030",
        priority: 4,
      },
      {
        name: "Team Meeting",
        date: "22-06-2003",
        time: "5:00 PM",
        category: "Personal",
        priority: 3,
      },
      {
        name: "Suite Dinner",
        date: "22-06-2003",
        time: "6:00 PM",
        category: "Personal",
        priority: 1,
      },
      {
        name: "Submit NTW essay",
        date: "22-06-2003",
        time: "11:00 PM",
        category: "NTW2004",
        priority: 4,
      },
    ],
  },
  {
    day: "Friday",
    events: [
      {
        name: "Lunch",
        date: "23-06-2003",
        time: "12:30 PM",
        category: "Personal",
        priority: 1,
      },
      {
        name: "Dinner with Jon",
        date: "23-06-2003",
        time: "6:00 PM",
        category: "Personal",
        priority: 1,
      },
    ],
  },
];

// list of sample tasks with the reminder date set to today.
// has to be updated in the actual planner page; i haven't figured that out yet.
export const sampleDayTasks = [
  {
    name: "Watch CS2030 Lecture",
    priority: 4,
    reminder: "22 June 2023",
  },
  {
    name: "MA2001 Tutorial 9",
    priority: 3,
    reminder: "22 June 2023",
  },
  {
    name: "Buy snacks from Octobox",
    priority: 1,
    reminder: "22 June 2023",
  },
  {
    name: "Do laundry",
    priority: 1,
    reminder: "22 June 2023",
  },
  {
    name: "Read meeting minutes",
    priority: 3,
    reminder: "22 June 2023",
  },
  {
    name: "Charge my phone",
    priority: 2,
    reminder: "22 June 2023",
  },
];

// shortform of days
export const getShortDay = (day) => {
  const shortDays = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };
  return shortDays[day];
};

// for the homepage UI
export const quotesList = [
  "Inspiration does exist, but it must find you working. —Pablo Picasso",
  "Don't settle for average. Bring your best to the moment. Then, whether it fails or succeeds, at least you know you gave all you had.” —Angela Bassett",
  "Difficulties increase the nearer we get to the goal. —Johann Wolfgang von Goethe",
  "Whatever you think, be sure it is what you think; whatever you want, be sure that is what you want; whatever you feel, be sure that is what you feel.—T.S. Eliot",
  "Let us live so that when we come to die even the undertaker will be sorry. - Mark Twain",
];
