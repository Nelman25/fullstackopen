import { CoursePart } from "../App";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <i>{part.description}</i>
          </p>
        </>
      );
    case "group":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>Project exercises {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <i>{part.description}</i>
            <p>Submit to: {part.backgroundMaterial}</p>
          </p>
        </>
      );
    case "special":
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </>
      );
    default:
      assertNever(part);
  }
};

export default Part;
