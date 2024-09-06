import { useEffect, useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [mostVoted, setMostVoted] = useState(0);
    const [votes, setVotes] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
    });

    useEffect(() => {
        const highestVote = Math.max(...Object.values(votes));
        const highestVoteKey = Object.keys(votes).find(
            (key) => votes[key] === highestVote
        );
        setMostVoted(highestVoteKey);
    }, [votes]);

    const handleSelectAnecdote = () => {
        const random = Math.floor(Math.random() * anecdotes.length);
        setSelected(random);
    };

    const handleSubmitVote = (selected) => {
        const copy = {
            ...votes,
            [selected]: votes[selected] + 1,
        };
        setVotes(copy);
    };

    console.log(votes);
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={() => handleSubmitVote(selected)}>vote</button>
            <button onClick={handleSelectAnecdote}>next anecdote</button>

            <h1>Anecdote with the most votes</h1>
            <p>{anecdotes[mostVoted]}</p>
            <p>has {votes[mostVoted]} votes</p>
        </div>
    );
};

export default App;
