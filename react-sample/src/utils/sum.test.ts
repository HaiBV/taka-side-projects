import { describe, test, expect } from "vitest";
import { sum } from "@/utils/sum";

describe("test sum", () => {
  test("add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("add 5 + 5 to equal 10", () => {
    expect(sum(5, 5)).toBe(10);
  });

  test("add -1 + 1 to equal 0", () => {
    expect(sum(-1, 1)).toBe(0);
  });

  test("add 0 + 0 to equal 0", () => {
    expect(sum(0, 0)).toBe(0);
  });

  test("add 1.5 + 2.5 to equal 4", () => {
    expect(sum(1.5, 2.5)).toBeCloseTo(4, 1);
  });
});
