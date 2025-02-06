import { expect, test, describe } from "vitest";
import { handleMessages } from "@/utils/handleMessages";

describe("test sum", () => {
  test("at least 1 message", () => {
    expect(handleMessages([{ id: "123", type: "SessionStart", time: 1 }])).toStrictEqual({
      num_distinct_sessions: 1,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123"],
    });
  });

  test("2 messages - invalid session", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 1,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123"],
    });
  });

  test("2 messages - valid session", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "SessionStop", time: 10 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 1,
      longest_session_id: "123",
      longest_duration: 9,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: [],
    });
  });

  test("3 messages - valid session", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "123", type: "SessionStop", time: 10 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 1,
      longest_session_id: "123",
      longest_duration: 9,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: [],
    });
  });

  test("3 messages - invalid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "456", type: "SessionStart", time: 2 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 2,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123", "456"],
    });
  });

  test("4 messages - invalid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 2,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123", "456"],
    });
  });

  test("4 messages - invalid session and valid session", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "SessionStop", time: 10 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 2,
      longest_session_id: "123",
      longest_duration: 9,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: ["456"],
    });
  });

  test("5 messages - invalid session and valid session", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "123", type: "SessionStop", time: 10 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 2,
      longest_session_id: "123",
      longest_duration: 9,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: ["456"],
    });
  });

  test("5 messages - invalid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
        { id: "789", type: "StatusCharging", time: 4 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 3,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123", "456", "789"],
    });
  });

  test("5 messages - invalid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
        { id: "789", type: "SessionStop", time: 4 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 3,
      longest_session_id: undefined,
      longest_duration: undefined,
      smallest_session_id: undefined,
      smallest_duration: undefined,
      bad_sessions: ["123", "456", "789"],
    });
  });

  test("6 messages - valid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "123", type: "SessionStop", time: 10 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
        { id: "456", type: "SessionStop", time: 19 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 2,
      longest_session_id: "456",
      longest_duration: 17,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: [],
    });
  });

  test("6 messages - duplicate sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "123", type: "SessionStop", time: 10 },
        { id: "123", type: "SessionStart", time: 2 },
        { id: "123", type: "StatusCharging", time: 4 },
        { id: "123", type: "SessionStop", time: 19 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 1,
      longest_session_id: "123",
      longest_duration: 9,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: [],
    });
  });


  test("3 valid sessions", () => {
    expect(
      handleMessages([
        { id: "123", type: "SessionStart", time: 1 },
        { id: "123", type: "StatusCharging", time: 2 },
        { id: "123", type: "SessionStop", time: 10 },
        { id: "456", type: "SessionStart", time: 2 },
        { id: "456", type: "StatusCharging", time: 4 },
        { id: "456", type: "SessionStop", time: 19 },
        { id: "789", type: "SessionStart", time: 3 },
        { id: "789", type: "StatusCharging", time: 66 },
        { id: "789", type: "SessionStop", time: 99 },
      ])
    ).toStrictEqual({
      num_distinct_sessions: 3,
      longest_session_id: "789",
      longest_duration: 96,
      smallest_session_id: "123",
      smallest_duration: 9,
      bad_sessions: [],
    });
  });
});

// const sampleMessages = [
//   { id: "123", type: "SessionStart", time: 1 },
//   { id: "123", type: "StatusCharging", time: 2 },
//   { id: "123", type: "SessionStop", time: 10 },
//   { id: "456", type: "SessionStart", time: 2 },
//   { id: "456", type: "StatusCharging", time: 4 },
//   { id: "456", type: "SessionStop", time: 19 },
// ];

// const sampleOutput = {
//   num_distinct_sessions: 2,
//   longest_session_id: "456",
//   longest_duration: 17,
//   smallest_session_id: "123",
//   smallest_duration: 9,
//   bad_sessions: [],
// };
