import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { waitFor, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import env from "@/utils/env";
import Joke from "./Joke";

const sampleJokesResponse = [
  {
    joke: "What happens when you steamroll Batman and Robin? They become flatman and ribbon.",
  },
];

export const restHandlers = [
  http.get(`${env("JOKE_API_BASE_URL")}/jokes`, () => {
    return HttpResponse.json(sampleJokesResponse);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe("Joke", () => {
  test("displays loading state initially", () => {
    render(<Joke />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("fetches data and displays it", async () => {
    // Mock a successful fetch response
    render(<Joke />);

    // Wait for data to be fetched and rendered
    await waitFor(() => expect(screen.getByText(sampleJokesResponse[0].joke)).toBeInTheDocument());
  });

  test("handles fetch error gracefully", async () => {
    // Mock a failed fetch response
    server.use(
      http.get(`${env("JOKE_API_BASE_URL")}/jokes`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<Joke />);

    // Wait for error message to appear
    await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
  });
});
