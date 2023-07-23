import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import HomePage from "../Home/HomePage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { quotesList } from "../Constants";

// mock the appbar component
jest.mock("../AppBar/AppBarComponent", () => {
  return jest.fn(() => <div>Mocked AppBarComponent</div>);
});

// mock the drawer component
jest.mock("../Drawer/DrawerComponent", () => {
  return jest.fn(() => <div>Mocked DrawerComponent</div>);
});

// mock axios and set the resolved value
jest.mock("axios", () => ({
  post: jest.fn(() =>
    Promise.resolve({
      data: {
        res: {
          name: "John Doe",
        },
      },
    })
  ),
}));

describe("HomePage", () => {
  test("renders the homepage component with dashboard shortcuts ", () => {
    render(
      <MemoryRouter basename="/">
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Next quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/What's Trending/i)).toBeInTheDocument();

    const todayProgressElements = screen.queryAllByText("Today's Progress");
    expect(todayProgressElements).toHaveLength(1);

    const todayElements = screen.queryAllByText("Today");
    expect(todayElements).toHaveLength(1);
    expect(screen.getByText(/Coming Up Next/i)).toBeInTheDocument();
  });

  // test if the user's name is rendered
  test("greets user by name", async () => {
    const mockUserData = {
      data: {
        res: {
          name: "John Doe",
        },
      },
    };
    jest.spyOn(axios, "post").mockResolvedValue(mockUserData);

    render(
      <MemoryRouter basename="/">
        <HomePage />
      </MemoryRouter>
    );

    await screen.findByText(/Welcome Back, John Doe/i);
    expect(screen.getByText(/Welcome Back, John Doe/i)).toBeInTheDocument();
  });
});

/*
// search bar tests
  describe("SearchBar", () => {
    // checking the rendering
    test("renders the search bar component", () => {
      render(
        <MemoryRouter>
          <SearchBar
            label="Search this site..."
            searchRecommendations={[]}
            width="200px"
          />
        </MemoryRouter>
      );

      expect(screen.getByLabelText("Search this site...")).toBeInTheDocument();
    });

    // test navigation with enter key
    test("navigates with enter key", () => {
      render(
        <MemoryRouter>
          <SearchBar
            label="Search this site..."
            searchRecommendations={[
              { option: "Option 1", link: "/option1" },
              { option: "Option 2", link: "/option2" },
            ]}
            width="200px"
          />
        </MemoryRouter>
      );

      const mockNavigate = require("react-router-dom").useNavigate();
      mockNavigate.mockReturnValue(jest.fn());

      const searchInput = screen.getByTestId("search-input"); // the search input autocomplete

      userEvent.type(searchInput, "Option");
      userEvent.type(searchInput, "{enter}");

      console.log("Navigate calls:", mockNavigate.mock.calls);

      expect(mockNavigate).toHaveBeenCalledWith("/option1");
    });
  });
  */
