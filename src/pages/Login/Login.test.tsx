import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("render sLogin Me in to React", () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login Me in to React/i);
  expect(linkElement).toBeInTheDocument();
});
