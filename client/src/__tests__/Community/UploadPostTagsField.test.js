import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
