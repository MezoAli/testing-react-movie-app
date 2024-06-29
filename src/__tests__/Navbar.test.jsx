import { screen, render } from "@testing-library/react";
import Navbar from "../components/NavBar";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderWithRedux } from "./utils/ReduxConfig";
import { createMSW } from "./utils/MSWConfig";
import App from "../App";

createMSW([
  {
    method: "get",
    url: "https://api.themoviedb.org/3/search/movie",
    response: {
      results: [
        {
          id: 1,
          poster_path: "test",
          original_title: "test",
          release_date: "test",
          vote_count: "test",
          vote_average: 1,
          title: "test",
        },
      ],
      total_pages: 1,
    },
  },
]);

describe("testing navbar ui", () => {
  test("testing navbar", () => {
    renderWithRedux(<Navbar />);
    const logo = screen.getByTestId("logo");
    const searchInput = screen.getByTestId("searchInput");
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  test("testing navbar search input", async () => {
    const search = vi.fn();
    renderWithRedux(<Navbar search={search} />);
    const searchInput = screen.getByTestId("searchInput");
    await userEvent.type(searchInput, "moutaz");
    expect(searchInput).toHaveValue("moutaz");
    expect(search).toBeCalledWith("moutaz");
  });

  test("when user types he gets results", async () => {
    renderWithRedux(<App />);
    const searchInput = screen.getByTestId("searchInput");
    await userEvent.type(searchInput, "heaven");
    const movieCards = await screen.findAllByTestId("movieCard");
    expect(movieCards).toHaveLength(1);
  });
});
