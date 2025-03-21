import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Footer from "@/layouts/Footer";

describe("Footer", () => {
  test("render without crashing", () => {
    render(<Footer />);
    const disclamer = screen.getByText("Shop.co © 2000-2023, All Rights Reserved.");
    expect(disclamer).toBeInTheDocument();
  });
});
