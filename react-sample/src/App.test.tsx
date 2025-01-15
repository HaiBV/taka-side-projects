import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";
describe("Test App", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Vite + React");
  });
});
