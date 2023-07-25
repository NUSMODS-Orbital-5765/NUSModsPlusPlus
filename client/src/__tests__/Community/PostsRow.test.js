import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostsRow from "../../Community/PostsRow";
import PostsGrid from "../../Community/PostsGrid";

const mockPostList = [
  {
    id: "post123",
    dateCreated: new Date(),
    title: "This is a sample post title",
    author: { avatar: "sample_avatar.png", username: "john.doe" },
    category: "Module Review",
    tags: ["Sample Tag 1", "Sample Tag 2"],
    content: "This is a sample post content.",
    upload_file: ["samplefile.pdf"],
    likeAmount: 7,
    comments: 6,
    like: [],
  },
];

describe("PostsRow", () => {
  test("post list rendered correctly", () => {
    render(<PostsRow postList={mockPostList} />);
    expect(screen.getByText("Top Posts")).toBeInTheDocument();
    expect(screen.getByText(mockPostList[0].title)).toBeInTheDocument();
  });
});

describe("PostsGrid", () => {
  test("post grid rendered correctly", () => {
    render(<PostsGrid postList={mockPostList} />);
    expect(screen.getByText("All Posts")).toBeInTheDocument();
    expect(screen.getByText(mockPostList[0].title)).toBeInTheDocument();
  });
});
