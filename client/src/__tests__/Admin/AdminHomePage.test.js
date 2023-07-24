import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { RecentlyViewedProfiles } from "../../Admin/AdminHomePage";
import { sampleStudentsList } from "../../Admin/AdminConstants";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

// using sampleStudentsList for testing
// testing the recently viewed component and clear all button
describe("Recently Viewed", () => {
  beforeEach(() => {
    render(<RecentlyViewedProfiles viewedProfiles={sampleStudentsList} />);
  });

  // render the component
  test("renders recently viewed component", () => {
    expect(screen.getByText(/Recently Viewed/i)).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByTestId("clear-button")).toBeInTheDocument();
  });

  // test clear all
  test("clear all button clears the profiles", () => {
    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(screen.queryByTestId("data-grid")).toBeNull();
  });
});
