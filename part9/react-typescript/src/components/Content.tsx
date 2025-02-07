import { CoursePart } from "../App";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

export default Content;
