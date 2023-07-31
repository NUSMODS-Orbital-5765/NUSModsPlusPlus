import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { formatDate } from "../../Constants";
import axios from "axios";
import CommunityPostComments from "../../Community/CommunityPostComments";

jest.mock("../../libs/AWSLinkGenerate", () => {
  return (fileName) => {
    return `https://example.com/${fileName}`;
  };
});

const mockComment = {
  author: { avatar: "sample_avatar.png", username: "john.doe" },
  dateCreated: new Date().toISOString(),
  content: "This is a sample comment content.",
};

describe("CommunityPostComments", () => {
  test("community post comments rendered correctly", async () => {
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { commentsList: [mockComment] } });

    render(
      <CommunityPostComments postId="samplePostId" commentAddStatus={0} />
    );

    await screen.findByText(mockComment.author.username);
    await screen.findByText(formatDate(new Date(mockComment.dateCreated)));
    await screen.findByText(mockComment.content);

    const avatar = screen.getByAltText(mockComment.author.username);
    const expectedAvatarSrc = `https://example.com/${mockComment.author.avatar}`;
    expect(avatar).toHaveAttribute("src", expectedAvatarSrc);
  });
});
