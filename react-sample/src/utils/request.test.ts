import { describe, test, expect, afterAll, afterEach, beforeAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import env from "@/utils/env";
import { fetchJoke } from "./request";
import { Joke } from "@/types/Joke";

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

describe("fetchData Utility", () => {
  test("fetches data successfully", async () => {
    const data = await fetchJoke<Joke[]>(`/jokes`);
    expect(data).toHaveLength(1);
    expect(data[0].joke).toBe(sampleJokesResponse[0].joke);
  });

  test("handles fetch failure", async () => {
    server.use(
      http.get(`${env("JOKE_API_BASE_URL")}/jokes`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );

    await expect(fetchJoke("/jokes")).rejects.toThrow("Error fetching data: HTTP error! status: 500");
  });
});
