interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target: number): Output => {
  const periodLength = days.length;
  const trainingDays = days.filter((i) => i > 0).length;
  const total = days.reduce((acc, total) => acc + total, 0);
  const average = total / periodLength;
  const success = average > target;
  const score: number = (average / target) * 100;
  let rating: number;
  let ratingDescription: string;

  if (score >= 66.7 && score <= 100) {
    rating = 3;
    ratingDescription =
      "You did well this week! Keep it up—your dedication is paying off!";
  } else if (score >= 33.4 && score <= 66.6) {
    rating = 2;
    ratingDescription =
      "You had a decent week! There's room for improvement, but you're on the right track. Stay consistent!";
  } else if (score >= 0 && score <= 33.3) {
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
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
