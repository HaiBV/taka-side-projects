import useJoke from "@/hooks/useJoke";

const Joke = () => {
  const { jokes, isLoading, error } = useJoke();

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {jokes.map((item, index) => (
        <p key={index} className="read-the-docs text-3xl font-bold underline">
          {item.joke}
        </p>
      ))}
    </>
  );
};

export default Joke;
