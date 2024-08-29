const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    );
};
const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} exercise={props.exercise1} />
            <Part part={props.part2} exercise={props.exercise2} />
            <Part part={props.part3} exercise={props.exercise3} />
        </div>
    );
};

const Total = (props) => {
    return <p>Number of exercises {props.totalExercise}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const exercises1 = 10;
    const exercises2 = 7;
    const exercises3 = 14;
    const part1 = "Fundamentals of React";
    const part2 = "Using props to pass data";
    const part3 = "State of a component";

    return (
        <div>
            <Header course={course} />
            <Content
                exercises1={exercises1}
                exercises2={exercises2}
                exercises3={exercises3}
                part1={part1}
                part2={part2}
                part3={part3}
            />
            <Total totalExercise={exercises1 + exercises2 + exercises3} />
        </div>
    );
};

export default App;
