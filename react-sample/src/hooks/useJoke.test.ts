import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import env from "@/utils/env";
import useJoke from "@/hooks/useJoke";
import { renderHook, waitFor } from "@testing-library/react";

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

describe("useUserPosts Hook", () => {
  test("fetches and returns user posts", async () => {
    const { result } = renderHook(() => useJoke());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.jokes).toHaveLength(1);
    expect(result.current.jokes[0].joke).toBe(sampleJokesResponse[0].joke);
    expect(result.current.error).toBeFalsy();
  });

  test("handles API failure", async () => {
    server.use(
      http.get(`${env("JOKE_API_BASE_URL")}/jokes`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useJoke());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeFalsy();
    expect(result.current.jokes).toHaveLength(0);
  });
});
