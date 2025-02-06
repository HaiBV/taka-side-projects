type Message = {
  id: string;
  type: "SessionStart" | "StatusCharging" | "SessionStop";
  time: number;
};

type Output = {
  num_distinct_sessions: number;
  longest_session_id: undefined | string;
  longest_duration: undefined | number;
  smallest_session_id: undefined | string;
  smallest_duration: undefined | number;
  bad_sessions: string[];
};

export const handleMessages = (messages: Message[]): Output => {
  const output: Output = {
    num_distinct_sessions: 0,
    longest_session_id: undefined,
    longest_duration: undefined,
    smallest_session_id: undefined,
    smallest_duration: undefined,
    bad_sessions: [],
  };

  const badSessions = new Set<string>();
  const existValidSessons = new Set<string>();
  const hash: { [key: string]: number } = {};

  messages.map((message) => {
    // Handle duplicate sessions
    if (existValidSessons.has(message.id)) return;

    // Handle invalid sessions (StatusCharging before SessionStart)
    if (message.type === "StatusCharging" && !hash[message.id]) {
      output.num_distinct_sessions++;
      badSessions.add(message.id);
    }

    // Handle valid sessions (SessionStart followed by SessionStop)
    if (message.type === "SessionStart") {
      hash[message.id] = message.time;
      output.num_distinct_sessions++;
      badSessions.add(message.id);
    }

    // Handle SessionStop messages, update longest and smallest sessions, and count distinct sessions.
    if (message.type === "SessionStop") {
      if (hash[message.id]) {
        const duration = message.time - hash[message.id];

        if (output.longest_duration === undefined || duration > output.longest_duration) {
          output.longest_duration = duration;
          output.longest_session_id = message.id;
        }

        if (output.smallest_duration === undefined || duration < output.smallest_duration) {
          output.smallest_duration = duration;
          output.smallest_session_id = message.id;
        }

        badSessions.delete(message.id);
        existValidSessons.add(message.id);
        delete hash[message.id];
      } else {
        output.num_distinct_sessions++;
        badSessions.add(message.id);
      }
    }
  });

  return { ...output, bad_sessions: [...badSessions] };
};
