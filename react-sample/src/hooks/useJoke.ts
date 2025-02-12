import { useEffect, useState } from "react";

import { fetchJoke } from "@/utils/request";
import { Joke } from "@/types/Joke";

const useJoke = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchJokes = async () => {
      setIsLoading(true);
      setError("");
      try {
        const jokes = await fetchJoke<Joke[]>("/jokes", { signal });
        setJokes(jokes);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setError(`Error: ${error.message}`);
          }
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJokes();

    return () => abortController.abort();
  }, []);

  return { jokes, isLoading, error };
};

export default useJoke;
