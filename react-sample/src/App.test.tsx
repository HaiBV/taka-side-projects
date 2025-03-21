import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("Test App component", () => {
  test("renders without crashing", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    // expect(heading).toHaveTextContent("Vite + React");
  });
});
