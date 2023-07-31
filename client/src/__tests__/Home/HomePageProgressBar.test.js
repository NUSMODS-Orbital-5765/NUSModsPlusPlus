import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import HomePageProgressBar from "../../Home/HomePageProgressBar";
import { MemoryRouter } from "react-router-dom";
import { getProgressBarUtilityClass } from "@mui/material/LinearProgress";
import HomePageEventProgressBar from "../../Home/HomePageEventProgressBar";
import { isEventOver } from "../../Home/HomePageTimetable";

describe("HomePageProgressBar", () => {
  test("progress bar component renders correctly", () => {
    render(<HomePageProgressBar />);

    expect(screen.getByText("Today's Progress")).toBeInTheDocument();
    expect(screen.getByText("Event Progress")).toBeInTheDocument();
  });

  test("displays encouraging message for different times of the day", () => {
    const before12pmMockDate = new Date("2023-07-26T09:00:00");
    jest.spyOn(global, "Date").mockImplementation(() => before12pmMockDate);

    render(<HomePageProgressBar />);

    const message = screen.getByText("You're off to a great start.");
    expect(message).toBeInTheDocument();
    global.Date.mockRestore();
  });

  test("displays encouraging message for different times of the day", () => {
    const between12pmAnd6pmMockDate = new Date("2023-07-26T15:00:00");
    jest
      .spyOn(global, "Date")
      .mockImplementation(() => between12pmAnd6pmMockDate);

    render(<HomePageProgressBar />);

    const message = screen.getByText("Keep going!");
    expect(message).toBeInTheDocument();
    global.Date.mockRestore();
  });

  test("displays encouraging message for different times of the day", () => {
    const after6pmMockDate = new Date("2023-07-26T20:00:00");
    jest.spyOn(global, "Date").mockImplementation(() => after6pmMockDate);

    render(<HomePageProgressBar />);

    const message = screen.getByText("Keep it up, you're almost there!");
    expect(message).toBeInTheDocument();
    global.Date.mockRestore();
  });

  test("displays correct time in 12-hour format", () => {
    const specificMockDate = new Date("2023-07-26T15:30:00");
    jest.spyOn(global, "Date").mockImplementation(() => specificMockDate);

    render(<HomePageProgressBar />);

    const expectedTime = "3:30 PM";
    const timeElement = screen.getByText(expectedTime);
    expect(timeElement).toBeInTheDocument();
    global.Date.mockRestore();
  });

  test("displays progress bar value correctly", () => {
    const specificMockDate = new Date("2023-07-26T15:30:00");
    jest.spyOn(global, "Date").mockImplementation(() => specificMockDate);

    render(<HomePageProgressBar />);

    const progressBars = screen.getAllByRole("progressbar");
    let progressBarWith65Value;
    for (const progressBar of progressBars) {
      const ariaValueNow = progressBar.getAttribute("aria-valuenow");
      if (ariaValueNow === "65") {
        progressBarWith65Value = progressBar;
        break;
      }
    }

    expect(progressBarWith65Value).toBeInTheDocument();
    global.Date.mockRestore();
  });
});

const mockEventsList = [
  {
    date: "26-07-2023",
    time: "10:00 PM",
  },
  {
    date: "26-07-2023",
    time: "11:00 PM",
  },
];

describe("HomePageEventProgressBar", () => {
  test("event progress bar component renders correctly if no events", () => {
    render(<HomePageEventProgressBar todayEvents={null} />);

    expect(screen.getByText("Event Progress")).toBeInTheDocument();
    expect(screen.getByText(/No Events/)).toBeInTheDocument();
  });

  test("event progress bar component renders correctly if no events", () => {
    render(<HomePageEventProgressBar todayEvents={[]} />);

    expect(screen.getByText("Event Progress")).toBeInTheDocument();
    expect(screen.getByText(/No Events/)).toBeInTheDocument();
  });

  test("event progress bar component renders correctly with events", () => {
    render(<HomePageEventProgressBar todayEvents={mockEventsList} />);

    expect(screen.getByText("Event Progress")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("/2")).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar.getAttribute("aria-valuenow") === "50");
  });
});
