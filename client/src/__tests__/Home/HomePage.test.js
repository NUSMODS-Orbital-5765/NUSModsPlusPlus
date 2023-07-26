import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePage from "../../Home/HomePage";
import { MemoryRouter } from "react-router-dom";
import { quotesList } from "../../Constants";

// mock any external dependencies
jest.mock("../../AppBar/AppBarComponent", () => {
  return jest.fn(() => <div>Mocked AppBarComponent</div>);
});

jest.mock("../../Drawer/DrawerComponent", () => {
  return jest.fn(() => <div>Mocked DrawerComponent</div>);
});

jest.mock("../../Home/HomePageProgressBar", () => {
  return jest.fn(() => <div>Mocked HomePageProgressBar</div>);
});

jest.mock("../../Home/HomePageRecommendedPosts", () => {
  return jest.fn(() => <div>Mocked HomePageRecommendedPosts</div>);
});

jest.mock("../../Home/HomePageTimetable", () => {
  return jest.fn(() => <div>Mocked HomePageTimetable</div>);
});

// mock local storage
jest
  .spyOn(window.localStorage.__proto__, "getItem")
  .mockReturnValue("John Doe");

// home page test cases
describe("HomePage", () => {
  test("renders the homepage component with dashboard shortcuts ", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByTestId("quote-button")).toBeInTheDocument();
    const currentQuote = screen.queryAllByText(quotesList[0]);
    expect(currentQuote).toHaveLength(1);

    expect(screen.getByText(/Mocked AppBarComponent/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked DrawerComponent/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked HomePageProgressBar/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mocked HomePageRecommendedPosts/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Mocked HomePageTimetable/i)).toBeInTheDocument();
  });

  // test for the username fetching
  test("renders the correct username", () => {
    render(<HomePage />);
    const usernameElement = screen.getByText("Welcome Back, John Doe");
    expect(usernameElement).toBeInTheDocument();
  });

  // test for the next quote button
  test("clicking next quote button updates the quote", () => {
    render(<HomePage />);
    const currentQuote = screen.getByText(quotesList[0]);
    expect(currentQuote).toBeInTheDocument();

    const nextQuoteButton = screen.getByTestId("quote-button");
    fireEvent.click(nextQuoteButton);
    expect(screen.queryByText(quotesList[0])).toBeNull();

    expect(screen.getByText(quotesList[1])).toBeInTheDocument();
  });
});
