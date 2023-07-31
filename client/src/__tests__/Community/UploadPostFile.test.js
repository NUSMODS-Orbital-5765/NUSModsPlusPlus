// KIV first, i'm not sure why i can't upload the file
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByText,
} from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import UploadPostFile from "../../UploadPost/UploadPostFile";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";

describe("UploadPostFile", () => {
  test("should handle selected file with a valid type", () => {
    const handleFormFile = jest.fn();
    const allowedTypes = ["image/jpeg"];

    const { container, getByText } = render(
      <UploadPostFile
        allowedTypes={allowedTypes}
        handleFormFile={handleFormFile}
      />
    );

    const inputElement = container.querySelector('input[type="file"]');
    fireEvent.change(inputElement, {
      target: {
        files: [new File([""], "sampleImage.jpg", { type: "image/jpeg" })],
      },
    });

    expect(getByText("sampleImage.jpg")).toBeInTheDocument();
  });
});
