import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import ProfilePictureComponent from "../../Profile/ProfilePictureComponent";
import axios from "axios";

describe("ProfilePictureComponent", () => {
  test("displays the uploaded image correctly", () => {
    const sampleIcon = "path/to/sampleIcon.jpg";
    const { container } = render(
      <ProfilePictureComponent sampleIcon={sampleIcon} />
    );

    const initialImgElement = container.querySelector("img");
    expect(initialImgElement.getAttribute("src")).toBe(sampleIcon);

    const uploadedFile = new File([""], "newImage.jpg", { type: "image/jpeg" });

    const inputElement = container.querySelector('input[type="file"]');
    fireEvent.change(inputElement, {
      target: {
        files: [uploadedFile],
      },
    });

    const updatedImgElement = container.querySelector("img");
    const expectedSrc = "data:image/jpeg;base64," + uploadedFile.preview;
    expect(updatedImgElement.getAttribute("src")).toBe(expectedSrc);
  });
});
