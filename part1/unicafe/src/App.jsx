/* eslint-disable react/prop-types */
import { useState } from "react";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    <StatisticsLine text="all" value={total} />
                    <StatisticsLine text="average" value={average} />
                    <StatisticsLine text="positive" value={`${positive}%`} />
                </tbody>
            </table>
        </>
    );
};

const Button = ({ onSubmitFeedback, text }) => {
    return <button onClick={onSubmitFeedback}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

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
                <Button onSubmitFeedback={handleGoodFeedback} text="good" />
                <Button
                    onSubmitFeedback={handleNeutralFeedback}
                    text="neutral"
                />
                <Button onSubmitFeedback={handleBadFeedback} text="bad" />
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
