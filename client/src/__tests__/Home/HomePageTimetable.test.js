import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  getThisWeekEvents,
  getTodayDayOfWeek,
  parseTime,
  isEventOver,
  TimelineBox,
  EventCard,
  TodayTimeline,
  ThisWeekTimetable,
} from "../../Home/HomePageTimetable";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { priorityColors } from "../../Constants";
import HomePageTimetable from "../../Home/HomePageTimetable";

const mockWeekEvents = [
  { date: "26-07-2023", title: "Event 1" },
  { date: "27-07-2023", title: "Event 2" },
  { date: "27-07-2023", title: "Event 3" },
  { date: "28-07-2023", title: "Event 4" },
];

describe("getThisWeekEvents", () => {
  test("should group events by day of the week", () => {
    const eventsDict = getThisWeekEvents(mockWeekEvents);

    expect(eventsDict).toEqual({
      Wednesday: [{ date: "26-07-2023", title: "Event 1" }],
      Thursday: [
        { date: "27-07-2023", title: "Event 2" },
        { date: "27-07-2023", title: "Event 3" },
      ],
      Friday: [{ date: "28-07-2023", title: "Event 4" }],
    });
  });

  test("should handle an empty events array", () => {
    const emptyEvents = [];
    const eventsDict = getThisWeekEvents(emptyEvents);

    expect(eventsDict).toEqual({});
  });
});

describe("getTodayDayOfWeek", () => {
  test("getTodayDayOfWeek returns the correct day of the week", () => {
    const expectedDay = "Thursday";

    const result = getTodayDayOfWeek();

    expect(result).toBe(expectedDay);
  });
});

describe("ParseTime", () => {
  test("parseTime correctly parses the time string", () => {
    const timeString = "03:30 PM";
    const expectedDate = new Date(0, 0, 0, 15, 30);

    const result = parseTime(timeString);

    expect(result).toEqual(expectedDate);
  });
});

describe("isEventOver", () => {
  test("isEventOver returns true for an event in the past", () => {
    const pastEvent = {
      date: "25-07-2023",
      time: "08:00 PM",
    };

    const result = isEventOver(pastEvent);

    expect(result).toBe(true);
  });
});

const mockEvent = {
  name: "Test Event",
  category: "test category",
  date: "26-07-2023",
  time: "08:00 AM",
  priority: 4,
};

describe("TimelineBox", () => {
  test("timeline box renders correctly", () => {
    render(<TimelineBox event={mockEvent} />);
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(screen.getByText(/test category/)).toBeInTheDocument();
    expect(screen.getByText(/08:00 AM/i)).toBeInTheDocument();
  });
});

describe("EventCard", () => {
  test("event card renders correctly", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(screen.getByText(/test category/)).toBeInTheDocument();
    expect(screen.getByText(/08:00 AM/i)).toBeInTheDocument();
  });

  test("renders with the correct background color based on priority", () => {
    render(<EventCard event={mockEvent} />);

    const eventCard = screen.getByTestId("event-card");
    const hexToRGB = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    };

    const opacity = window.getComputedStyle(eventCard).opacity;
    const backgroundColor = window.getComputedStyle(eventCard).backgroundColor;
    const expectedBackgroundColor = hexToRGB(
      priorityColors[mockEvent.priority]
    );
    expect(backgroundColor).toBe(expectedBackgroundColor);
    expect(parseFloat(opacity)).toBe(0.7);
  });
});

describe("TodayTimeline", () => {
  test("renders timeline items correctly", () => {
    const mockEventsList = [
      {
        name: "Test Event",
        category: "test category",
        date: "26-07-2023",
        time: "08:00 AM",
        priority: 4,
      },
      {
        name: "Test Event 1",
        category: "test category 1",
        date: "27-07-2023",
        time: "10:00 AM",
        priority: 2,
      },
    ];

    render(
      <MemoryRouter>
        <TodayTimeline eventsList={mockEventsList} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    const seeMoreButton = screen.getByTestId("see-more-button");
    expect(seeMoreButton).toBeInTheDocument();

    expect(seeMoreButton).toHaveAttribute("href", "/planner-events");
    const timelineItems = screen.getAllByTestId("timeline-item");
    expect(timelineItems).toHaveLength(mockEventsList.length);
  });

  test("renders no events placeholder when eventsList is empty", () => {
    const emptyEventsList = [];

    render(
      <MemoryRouter>
        <TodayTimeline eventsList={emptyEventsList} />
      </MemoryRouter>
    );
    const noEventsPlaceholder = screen.getByTestId("no-events-placeholder");
    expect(noEventsPlaceholder).toBeInTheDocument();
  });
});

const mockTimetableEvents = [
  {
    name: "Test Event 1",
    category: "test category",
    date: "26-07-2023",
    time: "08:00 AM",
    priority: 4,
  },
  {
    name: "Test Event 2",
    category: "test category",
    date: "27-07-2023",
    time: "08:00 AM",
    priority: 4,
  },
  {
    name: "Test Event 3",
    category: "test category",
    date: "27-07-2023",
    time: "08:00 AM",
    priority: 4,
  },
  {
    name: "Test Event 4",
    category: "test category",
    date: "28-07-2023",
    time: "08:00 AM",
    priority: 4,
  },
];

describe("ThisWeekTimetable", () => {
  test("timetable items rendered correctly", () => {
    render(
      <MemoryRouter>
        <ThisWeekTimetable
          eventsDict={getThisWeekEvents(mockTimetableEvents)}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Coming Up Next/i)).toBeInTheDocument();
    const seeMoreButton = screen.getByTestId("see-more-button");
    expect(seeMoreButton).toBeInTheDocument();

    expect(seeMoreButton).toHaveAttribute("href", "/planner-events");
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Tue/i)).toBeInTheDocument();

    // check can see events
    mockTimetableEvents.forEach(
      (event) =>
        expect(screen.getByText(event.name)).toBeInTheDocument() &&
        expect(screen.getByText(event.category)).toBeInTheDocument() &&
        expect(screen.getByText(event.time)).toBeInTheDocument()
    );
  });
});
