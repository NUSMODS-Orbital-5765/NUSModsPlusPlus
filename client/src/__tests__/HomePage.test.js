import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import HomePage from "../Home/HomePage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "../StyledComponents";
import AppBarComponent from "../AppBar/AppBarComponent"; // Import the AppBarComponent separately

// mock the appbar component
jest.mock("../AppBar/AppBarComponent", () => {
  return jest.fn(() => <div>Mocked AppBarComponent</div>);
});

// mock api function
jest.mock("axios");

// define mock quotes and sample profile
const quotesList = ["Quote 1", "Quote 2"];
const sampleProfile = {
  avatar: "sample_avatar.jpg",
};

describe("HomePage", () => {
  test("renders the homepage component with dashboard shortcuts ", () => {
    render(
      <MemoryRouter basename="/">
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Next quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Today's Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/What's Trending/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
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

  // test next quote button
  test("update quote on button click", async () => {
    render(
      <MemoryRouter basename="/">
        <HomePage />
      </MemoryRouter>
    );

    // Use queryByText instead of findByText
    const quoteElement = screen.queryByText((content, element) => {
      // Return true if the content matches the desired text pattern
      return quotesList.includes(content);
    });

    userEvent.click(screen.getByTestId("quote-button"));
    expect(quoteElement).not.toBeInTheDocument();

    const newQuoteElement = await screen.findByText(quotesList[1]);
    expect(newQuoteElement).toBeInTheDocument();
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
