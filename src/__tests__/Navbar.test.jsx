import { screen, render } from "@testing-library/react";
import Navbar from "../components/NavBar";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("testing navbar ui", () => {
  test("testing navbar", () => {
    render(<Navbar />);
    const logo = screen.getByTestId("logo");
    const searchInput = screen.getByTestId("searchInput");
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test("testing navbar search input", async () => {
    const search = vi.fn();
    render(<Navbar search={search} />);
    const searchInput = screen.getByTestId("searchInput");
    await userEvent.type(searchInput, "moutaz");
    expect(searchInput).toHaveValue("moutaz");
    expect(search).toBeCalledWith("moutaz");
  });
});
