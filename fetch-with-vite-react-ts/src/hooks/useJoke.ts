import { useEffect, useState } from "react";
import request from "src/utils/request";

type Joke = {
  joke: string;
};

const useJoke = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const jokes = await request<Joke[]>("/jokes");
        if (!didCancel) {
          setJokes(jokes);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
          console.error(error);
        }
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return { jokes, isLoading, isError };
};

export default useJoke;
