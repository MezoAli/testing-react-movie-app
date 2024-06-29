import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";

export const createMSW = (config) => {
  const handler = config.map((con) => {
    return http[con.method || "get"](con.url, ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("query");
      console.log("query", query);
      return HttpResponse.json(con.response);
    });
  });

  const server = setupServer(...handler);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
