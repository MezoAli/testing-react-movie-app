import { screen, render } from "@testing-library/react";
import Navbar from "../components/NavBar";
import { expect } from "vitest";

test("testing navbar", () => {
  render(<Navbar />);
  const logo = screen.getByTestId("logo");
  const searchInput = screen.getByTestId("searchInput");
  expect(logo).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});
