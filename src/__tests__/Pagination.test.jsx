import { findByTestId, render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import PaginationComponent from "../components/Pagination";
import { renderWithRedux } from "./utils/ReduxConfig";
import App from "../App";
import { createMSW } from "./utils/MSWConfig";
import userEvent from "@testing-library/user-event";

createMSW([
  {
    method: "get",
    url: "https://api.themoviedb.org/3/movie/popular",
    response: {
      results: [],
      total_pages: 1,
    },
  },
]);

describe("testing pagination component", () => {
  test("testing pagination ui", async () => {
    const getPage = vi.fn();
    const pagesCount = 10;
    render(<PaginationComponent getPage={getPage} pageCount={pagesCount} />);
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(7);
  });

  test("testing if no movies, no pagination", async () => {
    renderWithRedux(<App />);
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
    const noMoviesMessage = await screen.findByTestId("noMoviesMessage");
    expect(noMoviesMessage).toBeInTheDocument();
  });

  test("testing pagination click logic", async () => {
    const getPage = vi.fn();
    const pagesCount = 10;
    render(<PaginationComponent getPage={getPage} pageCount={pagesCount} />);
    const buttons = await screen.findAllByRole("button");
    await userEvent.click(buttons[2]);
    expect(getPage).toHaveBeenCalledTimes(1);
    expect(buttons[2]).toHaveAttribute("aria-current", "page");
  });
});
