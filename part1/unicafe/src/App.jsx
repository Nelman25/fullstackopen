/* eslint-disable react/prop-types */
import { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
    return (
        <div>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positive}%</p>
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    // const [total, setTotal] = useState(0);

    const total = good + bad + neutral;
    const goodScore = 1 * good;
    const badScore = -1 * bad;
    const average = total ? (goodScore + badScore) / total : 0;
    const positive = total ? (good / total) * 100 : 0;

    const handleGoodFeedback = () => {
        setGood(good + 1);
    };

    const handleNeutralFeedback = () => {
        setNeutral(neutral + 1);
    };

    const handleBadFeedback = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <button onClick={handleGoodFeedback}>good</button>
                <button onClick={handleNeutralFeedback}>neutral</button>
                <button onClick={handleBadFeedback}>bad</button>
            </div>
            {total === 0 ? (
                <p>No feedback given</p>
            ) : (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={total}
                    average={average}
                    positive={positive}
                />
            )}
        </div>
    );
};

export default App;
