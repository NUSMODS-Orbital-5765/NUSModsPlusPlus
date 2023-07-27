import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { ProfileInfoFrame } from "../../Profile/ProfileInfoComponent";
import ProfileInfoComponent from "../../Profile/ProfileInfoComponent";
import axios from "axios";

jest.mock("axios");

const sampleProfile = {
  name: "John Doe",
  NUSId: "123456",
  avatar: "sample_avatar.png",
  faculty: "Faculty of Science",
  primaryDegree: "Chemistry",
  secondMajor: "",
  academicPlan: "Double Degree",
  secondDegree: "Biology",
  minor: ["Mathematics", "Physics"],
  programme: "Test Programme",
};

describe("ProfileInfoFrame", () => {
  test("profile info frame renders correctly", () => {
    render(<ProfileInfoFrame userProfile={sampleProfile} />);
    expect(screen.getByText(/Personal Details/i)).toBeInTheDocument();
    expect(screen.getByText("General Information")).toBeInTheDocument();
    expect(screen.getByText("Academic Information")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
  });

  test("fills input fields with default values", () => {
    render(<ProfileInfoFrame userProfile={sampleProfile} />);
    const nameInput = screen.getByDisplayValue(`${sampleProfile.name}`);
    const studentIdInput = screen.getByDisplayValue(`${sampleProfile.NUSId}`);
    const facultyInput = screen.getByDisplayValue(`${sampleProfile.faculty}`);
    const degreeInput = screen.getByDisplayValue(
      `${sampleProfile.primaryDegree}`
    );
    const academicPlan = screen.getByDisplayValue("Double Degree");

    expect(screen.getByText("Double Degree")).toBeInTheDocument();
    const programmeInput = screen.getByDisplayValue("Test Programme");

    expect(nameInput).toBeInTheDocument();
    expect(studentIdInput).toBeInTheDocument();
    expect(facultyInput).toBeInTheDocument();
    expect(degreeInput).toBeInTheDocument();
    expect(academicPlan).toBeInTheDocument();
    expect(programmeInput).toBeInTheDocument();
  });

  test("edit button toggles editable state", () => {
    render(<ProfileInfoFrame userProfile={sampleProfile} />);
    const editButton = screen.getByTestId("edit-button");
    const inputLabels = ["Name *", "StudentID *"];
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

  test("should display success message on save", async () => {
    axios.post.mockResolvedValue({ data: "Profile updated successfully!" });

    render(<ProfileInfoFrame userProfile={sampleProfile} />);

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    const successMessage = await waitFor(() =>
      screen.getByText("Personal details updated successfully!")
    );
    expect(successMessage).toBeInTheDocument();
  });

  test("should display error message on save", async () => {
    const errorMessage = "Failed to update";
    axios.post.mockRejectedValue(new Error(errorMessage));

    render(<ProfileInfoFrame userProfile={sampleProfile} />);

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    const errorMessageElement = await waitFor(() =>
      screen.getByText("Failed to update personal details.")
    );

    expect(errorMessageElement).toBeInTheDocument();
  });
});
