// incomplete
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import EventsPlannerPage from "../../Planner/EventsPlannerPage";
import { EventsPageHeader } from "../../Planner/EventsPlannerPage";
import { EventsDataGrid } from "../../Planner/EventsPlannerPage";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("EventsPageHeader", () => {
  test("renders header text and image", () => {
    render(<EventsPageHeader />);

    expect(screen.getByText("Our handy scheduling tool.")).toBeInTheDocument();
    expect(
      screen.getByText("Easily keep track of academic and non-academic events.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Add New Event" })
    ).toBeInTheDocument();

    const imageElement = screen.getByAltText("Planner Header");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/planner-intro.png");
    expect(imageElement).toHaveAttribute("alt", "Planner Header");
  });
});
