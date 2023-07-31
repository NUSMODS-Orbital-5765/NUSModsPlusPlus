// COMPLETE
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminStudentsPage from "../../Admin/AdminStudentsPage";
import axios from "axios";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

// mock axios
jest.mock("axios");
const mockedAxios = axios;

// mock local storage to check if info retrieved correctly

jest
  .spyOn(window.localStorage.__proto__, "getItem")
  .mockReturnValue("Faculty of Science");

describe("AdminStudentsPage", () => {
  test("renders admin students page", async () => {
    const mockedData = [];
    mockedAxios.post.mockResolvedValueOnce({ data: { result: mockedData } });

    await waitFor(() => {
      render(
        <MemoryRouter>
          <AdminStudentsPage />
        </MemoryRouter>
      );

      // expect that the header is rendered
      expect(
        screen.getByText(/Plan validation made easy./i)
      ).toBeInTheDocument();
      // expect that the various input fields are rendered
      expect(screen.getByLabelText(/Filter by Faculty/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Filter by Programme/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Filter by Academic Plan/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Go/i)).toBeInTheDocument();

      // expect that the datagrid is rendered
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  test("retrieves admin department correctly", async () => {
    const mockedData = { data: { result: [] } };
    jest.spyOn(axios, "post").mockResolvedValue(mockedData);

    render(
      <MemoryRouter>
        <AdminStudentsPage />
      </MemoryRouter>
    );

    const programmeInput = screen.getByLabelText("Filter by Programme");
    const facultyInput = screen.getByLabelText("Filter by Faculty");

    expect(programmeInput.value).toEqual("");
    expect(facultyInput.value).toEqual("Faculty of Science");
  });
});
