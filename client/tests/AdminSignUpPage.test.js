import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AdminSignUpPage from "../src/SignUp/AdminSignUpPage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

beforeEach(() => {
  render(
    <MemoryRouter>
      <AdminSignUpPage />
    </MemoryRouter>
  );
});

describe("AdminSignUpPage", () => {
  // testing component rendering
  test("renders the component", () => {
    expect(
      screen.getByText("Welcome! Let's get you settled.")
    ).toBeInTheDocument();
  });

  // testing logo render
  test("renders the component", () => {
    expect(screen.getByAltText("nusmods_logo")).toBeInTheDocument();
  });

  // testing form fields update
  test("updates name input field correctly", () => {
    const nameInput = screen.getByLabelText("Name *");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");
  });

  test("updates staff ID input field correctly", () => {
    const staffIdInput = screen.getByLabelText("Staff ID *");
    fireEvent.change(staffIdInput, { target: { value: "123456" } });
    expect(staffIdInput).toHaveValue("123456");
  });
});
