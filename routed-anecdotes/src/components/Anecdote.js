const Anecdote = ({ anecdote, vote }) => {
  const voteAnecdote = () => {
    vote(anecdote.id);
  };

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        <p>has {anecdote.votes} votes</p>
        <button onClick={voteAnecdote}>vote</button>
      </div>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
