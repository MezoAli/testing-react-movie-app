import { screen } from "@testing-library/react";
import { renderWithRedux } from "./utils/ReduxConfig";
import { describe, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import { createMSW } from "./utils/MSWConfig";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: 123 }),
  };
});

createMSW([
  {
    method: "get",
    url: `https://api.themoviedb.org/3/movie/:id`,
    response: {
      vote_count: 10,
      title: "test",
      original_title: "test",
      release_date: "test",
      vote_average: 4.5,
      poster_path: "test",
      overview: "test",
      homepage: "test",
    },
  },
]);

describe("testing movie details", () => {
  test("testing movie details ui", async () => {
    renderWithRedux(
      <MemoryRouter>
        <MovieDetails />
      </MemoryRouter>
    );

    const image = await screen.findByRole("img");
    expect(image).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/test`
    );
  });
});
