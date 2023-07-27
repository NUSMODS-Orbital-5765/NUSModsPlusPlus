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

    const inputElement = container.querySelector('input[type="file"]');
    fireEvent.change(inputElement, {
      target: {
        files: [new File([""], "sampleImage.jpg", { type: "image/jpeg" })],
      },
    });

    const imgElement = container.querySelector("img");
    expect(imgElement.getAttribute("src")).toContain("path/to/sampleIcon.jpg");
  });
});
