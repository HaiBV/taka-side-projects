import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("Test App component", () => {
  test("renders without crashing", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings.length).greaterThanOrEqual(1);
    // expect(heading).toHaveTextContent("Vite + React");
  });
});
