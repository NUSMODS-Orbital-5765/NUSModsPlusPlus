const sampleSemesterModules = [
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

const currentSemesterModules = sampleSemesterModules
  .filter((object) => object.year === "23/24")
  .flatMap((year) => year.semesters["Semester 1"])
  .map((module) => module.moduleCode);

console.log({
    ...currentSemesterModules.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {}),
    Personal: [],
  })