import useJoke from "src/hooks/useJoke";

const Jokes = () => {
  const { jokes, isLoading, isError } = useJoke();

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      <div>{isLoading ? <div>Loading...</div> : jokes.map((joke, index) => <p key={index}>{joke.joke}</p>)}</div>
    </>
  );
};

export default Jokes;
