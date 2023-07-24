//COMPLETE
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AdminHomePage, {
  RecentlyViewedProfiles,
} from "../../Admin/AdminHomePage";
import { sampleStudentsList } from "../../Admin/AdminConstants";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

describe("AdminHomePage", () => {
  beforeEach(() => {
    localStorage.setItem("name", "John Doe"); // sets name to be John Doe
  });

  test("renders admin homepage", async () => {
    render(
      <MemoryRouter>
        <AdminHomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked AdminAppBar/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mocked AdminDrawerComponent/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back, John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Recently Viewed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();

    const navigateButton = screen.getByTestId("navigate-button");
    expect(navigateButton).toBeInTheDocument();
  });

  test("navigate button is functioning", async () => {
    render(
      <MemoryRouter>
        <AdminHomePage />
      </MemoryRouter>
    );

    const navigateButton = screen.getByTestId("navigate-button");
    expect(navigateButton).toBeInTheDocument();

    fireEvent.click(navigateButton);
    // jest does not perform the actual navigation, only can test if the button is working
  });
});

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
