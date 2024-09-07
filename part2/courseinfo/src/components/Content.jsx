/* eslint-disable react/prop-types */
import Part from "./Part";

const Content = ({ parts }) => {
    const exercises = parts.map((part) => part.exercises);
    const total = exercises.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
    return (
        <div>
            {parts.map((part) => (
                <Part
                    key={part.id}
                    name={part.name}
                    exercise={part.exercises}
                />
            ))}
            <h3>total of {total} exercises</h3>
        </div>
    );
};

export default Content;
