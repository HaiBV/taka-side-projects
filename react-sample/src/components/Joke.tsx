import useJoke from "@/hooks/useJoke";

const Joke = () => {
  const { jokes, isLoading, isError } = useJoke();

  return (
    <>
      {isError && "Something went wrong..."}
      {isLoading ? "loading..." : jokes.map((item) => <p className="read-the-docs">{item.joke}</p>)}
    </>
  );
};

export default Joke;
