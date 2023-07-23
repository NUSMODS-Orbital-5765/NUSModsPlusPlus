import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import AdminHomePage from "../../Admin/AdminHomePage";
import AdminAppBar from "../../Admin/AdminAppBar";
import AdminDrawerComponent from "../../Admin/AdminDrawerComponent";
import { RecentlyViewedProfiles } from "../../Admin/AdminHomePage";
import { MemoryRouter } from "react-router-dom";

// mock the problematic components
jest.mock("../../Admin/AdminAppBar", () => () => <div>Mocked AdminAppBar</div>);

jest.mock("../../Admin/AdminDrawerComponent", () => () => (
  <div>Mocked AdminDrawerComponent</div>
));

describe("AdminHomePage", () => {
  test("renders admin homepage", () => {
    render(
      <MemoryRouter basename="/admin/">
        <AdminHomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByTestId("navigate-button")).toBeInTheDocument();
    expect(screen.getByText(/Mocked AdminAppBar/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mocked AdminDrawerComponent/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Recently Viewed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});

// testing the recently viewed component and clear all button
describe("AdminHomePage", () => {
  test("renders admin homepage", () => {
    render(
      <MemoryRouter basename="/admin/">
        <AdminHomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByTestId("navigate-button")).toBeInTheDocument();
    expect(screen.getByText(/Mocked AdminAppBar/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mocked AdminDrawerComponent/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Recently Viewed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});
