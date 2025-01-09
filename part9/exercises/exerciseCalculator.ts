import { isNotNumber } from "../utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Inputs {
  target: number;
  days: number[];
}

const parseArguments = (args: string[]): Inputs => {
  if (args.length < 4) throw new Error("Not enough arguments.");

  const inputs = args.slice(2);
  const target = Number(inputs[0]);
  const days: number[] = [];

  inputs.slice(1).forEach((arg) => {
    if (isNotNumber(arg))
      throw new Error("Provided values are not all numbers, please try again.");
    else days.push(Number(arg));
  });

  return { target, days };
};

export const calculateExercises = (days: number[], target: number): Result => {
  // checks if all values provided are numbers (terminal or network request) 
  if (days.some((day) => isNaN(Number(day))) || isNaN(Number(target))) {
    throw new Error("Provided values are not all numbers, please try again.");
  }
  const periodLength = days.length;
  const trainingDays = days.filter((i) => i > 0).length;
  const total = days.reduce((acc, total) => acc + total, 0);
  const average = total / periodLength;
  const success = average > target;
  const score: number = (average / target) * 100;
  let rating: number = 1;
  let ratingDescription: string = "";

  if (score >= 66.7) {
    rating = 3;
    ratingDescription =
      "You did well this week! Keep it up—your dedication is paying off!";
  } else if (score >= 33.4 && score <= 66.6) {
    rating = 2;
    ratingDescription =
      "You had a decent week! There's room for improvement, but you're on the right track. Stay consistent!";
  } else {
    rating = 1;
    ratingDescription =
      "You struggled this week. Don't give up—every step counts. Keep pushing, and next week will be better!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  if (require.main === module) {
    const { target, days } = parseArguments(process.argv);
    console.log(calculateExercises(days, target));
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
