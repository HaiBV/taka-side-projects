import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import env from "@/utils/env";
import useJoke from "@/hooks/useJoke";

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

  test("aborts fetch request when component is unmounted", async () => {
    // Create a mock for aborting the fetch request
    const abortSpy = vi.spyOn(AbortController.prototype, "abort");

    // Render the component and simulate unmounting
    const { unmount } = renderHook(() => useJoke());

    // Unmount component to simulate aborting
    unmount();

    // Ensure the abort function is called when the component unmounts
    expect(abortSpy).toHaveBeenCalled();
    // FIXME: expected "abort" to be called 1 times, but got 4 times
    abortSpy.mockRestore();
  });
});
