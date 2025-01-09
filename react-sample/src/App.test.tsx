import { render, screen } from "@testing-library/react";

import App from "@/App";

describe("App", () => {
  it("renders without crashing", () => {
    // TODO: Implement this test
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Vite + React");
  });
});
