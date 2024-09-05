import { useState } from "react";

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);

    const goodScore = 1 * good;
    const badScore = -1 * bad;
    const average = total ? (goodScore + badScore) / total : 0;
    const positive = total ? (good / total) * 100 : 0;

    const handleGoodFeedback = () => {
        const updatedGood = good + 1;
        setGood(updatedGood);
        setTotal(updatedGood + neutral + bad);
    };

    const handleNeutralFeedback = () => {
        const updatedNeutral = neutral + 1;
        setNeutral(updatedNeutral);
        setTotal(good + updatedNeutral + bad);
    };

    const handleBadFeedback = () => {
        const updateBad = bad + 1;
        setBad(updateBad);
        setTotal(good + neutral + updateBad);
    };

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <button onClick={handleGoodFeedback}>good</button>
                <button onClick={handleNeutralFeedback}>neutral</button>
                <button onClick={handleBadFeedback}>bad</button>
            </div>
            <div>
                <h1>statistics</h1>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {total}</p>
                <p>average {average}</p>
                <p>positive {positive}%</p>
            </div>
        </div>
    );
};

export default App;
