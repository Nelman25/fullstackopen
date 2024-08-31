import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
    const [counter, setCounter] = useState(0);
    console.log("rendering with counter value ", counter);

    const increaseByOne = () => {
        console.log("increasing, value before ", counter);
        setCounter(counter + 1);
    };
    const decreaseByOne = () => {
        console.log("decreasing, value before ", counter);
        setCounter(counter - 1);
    };
    const setTo0 = () => {
        console.log("resetting to 0, value before ", counter);
        setCounter(0);
    };

    return (
        <div>
            <Display counter={counter} />
            <Button onClick={increaseByOne} text="plus" />
            <Button onClick={decreaseByOne} text="minus" />
            <Button onClick={setTo0} text="reset" />
        </div>
    );
};

export default App;
