import { screen } from "@testing-library/react";
import CardMovie from "../components/CardMovie";
import { expect } from "vitest";
import { renderWithRedux } from "./utils/ReduxConfig";
import { MemoryRouter } from "react-router-dom";

describe("testing movie card", () => {
  test("testing movie card with it's props", () => {
    const mov = {
      id: 1,
      vote_count: 10,
      original_title: "test",
      release_date: "test",
      vote_average: 4.5,
      poster_path: "test",
    };

    renderWithRedux(
      <MemoryRouter>
        <CardMovie mov={mov} />
      </MemoryRouter>
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${mov.poster_path}`
    );
    const ps = screen.getAllByRole("paragraph");
    expect(ps).toHaveLength(4);
  });
});
