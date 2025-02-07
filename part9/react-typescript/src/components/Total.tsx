interface HeaderProps {
  totalExercises: number;
}

const Total = ({ totalExercises }: HeaderProps) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
