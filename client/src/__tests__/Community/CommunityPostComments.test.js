import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CommunityHeader } from "../../Community/CommunityPage";
import CommunityPage from "../../Community/CommunityPage";
import { MemoryRouter } from "react-router-dom";
import { formatDate } from "../../Constants";
import axios from "axios";
