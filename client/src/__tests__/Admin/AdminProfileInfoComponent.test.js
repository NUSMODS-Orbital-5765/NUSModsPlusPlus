import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { AdminProfileInfoComponentFrame } from "../../Admin/AdminProfileInfoComponent";

// default profile
const mockAdminProfile = {
  name: "John Doe",
  NUSId: "s1234567",
  position: "admin",
  avatar: "sample_avatar_1.png",
  department: "Faculty of Science",
};

// render the component
beforeEach(() => {
  render(<AdminProfileInfoComponentFrame userProfile={mockAdminProfile} />);
});

describe("AdminProfileInfoComponentFrame", () => {
  test("renders the admin profile info", () => {
    // tests that headers and subheaders have been rendered correctly
    expect(screen.getByText(/Personal Details/i)).toBeInTheDocument();
    expect(screen.getByText(/General Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff Information/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });

  // check that the default value of the fields are rendered
  test("fills input fields with default values", () => {
    // tests that input fields are pre-filled with the userProfile values
    const nameInput = screen.getByDisplayValue(`${mockAdminProfile.name}`);
    const staffIdInput = screen.getByDisplayValue(`${mockAdminProfile.NUSId}`);
    const departmentInput = screen.getByDisplayValue(
      `${mockAdminProfile.department}`
    );
    const positionInput = screen.getByDisplayValue(
      `${mockAdminProfile.position}`
    );

    expect(nameInput).toBeInTheDocument();
    expect(staffIdInput).toBeInTheDocument();
    expect(departmentInput).toBeInTheDocument();
    expect(positionInput).toBeInTheDocument();
  });

  // check that edit button successfully toggles the edit fields
  test("edit button toggles editable state", () => {
    const editButton = screen.getByTestId("edit-button");
    const inputLabels = ["Name *", "StaffID *", "Department", "Position *"];
    // initial disabled state
    inputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeDisabled();
    });

    // click the edit button
    fireEvent.click(editButton);

    // enabled state
    inputLabels.forEach((label) => {
      expect(screen.getByLabelText(label)).not.toBeDisabled();
    });
  });

  // check that submit button is first disabled
  test("submit button disabled when no changes are made initially", () => {
    const saveButton = screen.getByTestId("submit-button");
    expect(saveButton).toBeDisabled();

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
    expect(saveButton).toBeDisabled();
  });

  // check that submit button remains disabled
  test("submit button remains disabled with empty input", () => {
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const saveButton = screen.getByTestId("submit-button");
    const inputField = screen.getByLabelText("Name *");
    fireEvent.change(inputField, { target: { value: "" } });
    expect(saveButton).toBeDisabled();
  });
});
