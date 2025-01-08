interface PersonInfo {
  height: number;
  weight: number;
}

const parseArgument = (args: string[]): PersonInfo => {
  if (args.length < 4) throw new Error("Not enough arguments!");
  if (args.length > 4) throw new Error("Too many arguments!");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers, please try again.");
  }
};

const calculateBMI = (weight: number, height: number): string => {
  const heightInMeters = height / 100;
  const BMI = weight / Math.pow(heightInMeters, 2);

  if (BMI < 18.5) return "Underweight";
  else if (BMI >= 18.5 && BMI <= 24.9) return "Normal weight";
  else if (BMI >= 25 && BMI <= 29.9) return "Overweight";
  else if (BMI >= 30) return "Obesity";
};

try {
  const { weight, height } = parseArgument(process.argv);
  console.log(calculateBMI(weight, height));
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
