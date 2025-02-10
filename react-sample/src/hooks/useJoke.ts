import { fetchJoke } from "@/utils/request";
import { useEffect, useState } from "react";

type Joke = {
  joke: string;
};

const useJoke = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchJokes = async () => {
      setIsLoading(true);
      try {
        const jokes = await fetchJoke<Joke[]>("/jokes");
        if (!didCancel) {
          setJokes(jokes);
        }
      } catch (err) {
        if (!didCancel) {
          setIsError(true);
          console.error(err);
        }
      }
      setIsLoading(false);
    };

    fetchJokes();

    return () => {
      didCancel = true;
    };
  }, []);

  return { jokes, isLoading, isError };
};

export default useJoke;
