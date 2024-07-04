import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import PaginationComponent from "../components/Pagination";

describe("testing pagination component", () => {
  test("testing pagination ui", async () => {
    const getPage = vi.fn();
    const pagesCount = 10;
    render(<PaginationComponent getPage={getPage} pageCount={pagesCount} />);
    const buttons = await screen.findAllByRole("button");
    console.log(buttons.length);
    expect(buttons).toHaveLength(7);
  });
});
