import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AddNewEvent from "../../Planner/AddNewEvent";
import { AddNewEventDialog } from "../../Planner/AddNewEvent";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("AddNewEvent", () => {
  test("Add New Event component renders correctly", () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    expect(addButton).toBeInTheDocument();
  });

  test('Clicking on the "Add New Event" button opens the dialog', () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
  });

  test("AddNewEventDialog component renders correctly", () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);
    const addEventButton = screen.getByText("Create Event");
    const cancelButton = screen.getByText("Cancel");
    const eventNameInput = screen.getByText("Event Name");
    const eventCategorySelect = screen.getByText("Event Category");
    const prioritySelect = screen.getByText("Priority");

    expect(addEventButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(eventNameInput).toBeInTheDocument();
    expect(eventCategorySelect).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
  });

  test("Adding a new event works correctly", () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);

    const eventNameInput = screen.getByLabelText("Event Name");

    fireEvent.change(eventNameInput, { target: { value: "Sample Event" } });
    expect(screen.getByDisplayValue("Sample Event")).toBeInTheDocument();
  });

  test("Adding a new event works correctly", () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);

    const eventNameInput = screen.getByLabelText("Event Name");

    fireEvent.change(eventNameInput, { target: { value: "Sample Event" } });
    expect(screen.getByDisplayValue("Sample Event")).toBeInTheDocument();
  });

  test("error message if incomplete", async () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);

    const createEventButton = screen.getByText("Create Event");
    fireEvent.click(createEventButton);

    await waitFor(() =>
      screen.getByText(
        "Failed to add event. Please ensure all fields are filled in."
      )
    );

    expect(
      screen.getByText(
        "Failed to add event. Please ensure all fields are filled in."
      )
    ).toBeInTheDocument();
  });

  test("cancel button working", () => {
    render(<AddNewEvent />);
    const addButton = screen.getByText("Add New Event");
    fireEvent.click(addButton);
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Cancel")).length === 0;
  });
});
