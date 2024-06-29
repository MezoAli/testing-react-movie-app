import { screen } from "@testing-library/react";
import { createMSW } from "./utils/MSWConfig";
import { renderWithRedux } from "./utils/ReduxConfig";
import userEvents from "@testing-library/user-event";
import App from "../App";
import { expect } from "vitest";

createMSW([
  {
    method: "get",
    url: "https://api.themoviedb.org/3/movie/popular",
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
  {
    method: "get",
    url: "https://api.themoviedb.org/3/search/movie",
    response: {
      results: [],
      total_pages: 0,
    },
  },
]);

describe("testing movieList component", () => {
  test("when first load", async () => {
    renderWithRedux(<App />);
    const cards = await screen.findAllByTestId("movieCard");
    expect(cards).toHaveLength(1);
  });

  test("when first load before fetching movies", () => {
    renderWithRedux(<App />);
    const noMoviesMessage = screen.getByTestId("noMoviesMessage");
    expect(noMoviesMessage).toBeInTheDocument();
  });

  test("when user inputs and no movies found", async () => {
    renderWithRedux(<App />);
    const searchInput = screen.getByTestId("searchInput");
    await userEvents.type(searchInput, "sdkdkaksja");
    const movieCards = screen.queryAllByTestId("movieCard");
    expect(movieCards).toHaveLength(0);
  });
});
