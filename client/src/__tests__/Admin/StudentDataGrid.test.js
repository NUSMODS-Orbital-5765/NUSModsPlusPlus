import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import StudentDataGrid from "../../Admin/StudentDataGrid";
import axios from "axios";

// mock the student module profile view
jest.mock("../../StudentModuleProfileView", () => () => (
  <div>Mocked StudentModuleProfileView</div>
));

// specifically for testing
const mockStudentList = [
  {
    NUSId: "A1234567",
    avatar: "avatar_url_1",
    name: "John Doe",
    username: "john_doe",
    primaryDegree: "Degree 1",
  },
  {
    NUSId: "B1234567",
    avatar: "avatar_url_2",
    name: "Jane Doe",
    username: "jane_doe",
    primaryDegree: "Degree 1",
  },
  {
    NUSId: "C1234567",
    avatar: "avatar_url_3",
    name: "Richard Roe",
    username: "richard_roe",
    primaryDegree: "Degree 2",
  },
];

const dataGridHeaders = ["NUS ID", "Profile", "Degree"];

describe("StudentDataGrid", () => {
  test("renders data grid information correctly", () => {
    render(<StudentDataGrid studentList={mockStudentList} color={true} />);

    // test the header rendering
    dataGridHeaders.forEach((headerText) => {
      const columnHeader = screen.getByRole("columnheader", {
        name: headerText,
      });

      expect(columnHeader).toBeInTheDocument();
    });

    // test the student list rendering
    mockStudentList.forEach((student) => {
      const rowData = Object.values(student)
        .map((value) => (value === student.avatar ? "Avatar" : value))
        .join(" ");

      const rowInfo = screen.getByRole("row", {
        name: rowData,
      });

      expect(rowInfo).toBeInTheDocument();
    });

    // test the avatar rendering
    mockStudentList.forEach((student) => {
      const avatars = screen.getAllByAltText("Avatar");

      const matchingAvatar = avatars.find(
        (avatar) => avatar.getAttribute("src") === student.avatar
      );

      expect(matchingAvatar).toBeInTheDocument();
    });
  });

  // test for opening profile dialog
  test("opens StudentModuleProfileView dialog on row click", () => {
    render(<StudentDataGrid studentList={mockStudentList} color={true} />);

    const rows = screen.getAllByRole("row");
    fireEvent.click(rows[0]);

    expect(
      screen.getByText(/Mocked StudentModuleProfileView/i)
    ).toBeInTheDocument();
  });
});
