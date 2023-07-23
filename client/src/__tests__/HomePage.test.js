import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import HomePage from "../Home/HomePage";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { quotesList } from "../Constants";

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
    test("renders all components properly", () => {
      render(<HomePage />);
      expect(screen.getByTestId("app-bar")).toBeInTheDocument();
      expect(screen.getByTestId("drawer")).toBeInTheDocument();
      expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
      expect(screen.getByTestId("quote-button")).toBeInTheDocument();
      expect(screen.getByText(/Today's Progress/i)).toBeInTheDocument();
      expect(screen.getByText(/Event Progress/i)).toBeInTheDocument();

      const todayProgressElements = screen.queryAllByText("Today's Progress");
      expect(todayProgressElements).toHaveLength(1);

      const todayElements = screen.queryAllByText("Today");
      expect(todayElements).toHaveLength(1);

      expect(screen.getByText(/Coming Up Next/i)).toBeInTheDocument();
      expect(screen.getByTestId("home-page-progress-bar")).toBeInTheDocument();
      expect(
        screen.getByTestId("home-page-recommended-posts")
      ).toBeInTheDocument();
      expect(screen.getByTestId("home-page-timetable")).toBeInTheDocument();
    });
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
