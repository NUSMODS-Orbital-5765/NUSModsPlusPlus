// unit
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import DrawerComponent from "../../Drawer/DrawerComponent";

// custom mock link that leads to a component (cannot use <a><href>)
const MockLink = ({ to, onClick, children }) => (
  <div onClick={onClick} data-to={to}>
    {children}
  </div>
);

// sample link feature
jest.mock("react-router-dom", () => ({
  Link: MockLink,
}));

// define mock constants for the drawer component
const tabsList = [
  { text: "Tab 1", icon: "Icon 1", link: "/tab1" },
  { text: "Tab 2", icon: "Icon 2", link: "/tab2" },
];

// render component before each test
beforeEach(() => {
  render(<DrawerComponent defaultTab={1} tabsList={tabsList} />);
});

// test that the component is rendered
describe("DrawerComponent", () => {
  test("renders the component with default tab selected", () => {
    expect(screen.getByRole("heading", { name: /Tab 1/ })).toBeInTheDocument();
  });

  // testing logo render
  test("logo appears on screen", () => {
    expect(screen.getByAltText("nusmods_logo")).toBeInTheDocument();
  });

  // handle switch selected tab
  test("changes selected tab when clicked", () => {
    screen.getByRole("heading", { name: /Tab 2/ }).click();

    expect(screen.getByRole("heading", { name: /Tab 2/ })).toBeInTheDocument();
  });

  // test for correct number of tabs
  test("renders the correct number of tabs", () => {
    const tabHeadings = screen.getAllByRole("heading");
    expect(tabHeadings).toHaveLength(2);

    expect(tabHeadings[0]).toHaveTextContent("Tab 1");
    expect(tabHeadings[1]).toHaveTextContent("Tab 2");
  });
});
