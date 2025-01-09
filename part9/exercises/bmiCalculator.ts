import { isNotNumber } from "../utils";

interface PersonInfo {
  height: number;
  weight: number;
}

type BMICatergories =
  | "Underweight"
  | "Normal weight"
  | "Overweight"
  | "Obesity";

const parseArguments = (args: string[]): PersonInfo => {
  if (args.length < 4) throw new Error("Not enough arguments!");
  if (args.length > 4) throw new Error("Too many arguments!");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (height <= 0) throw new Error("height must be greater than 0.");
  if (weight <= 0) throw new Error("weight must be greater than 0.");

  if (!isNotNumber(height) && !isNotNumber(weight)) {
    return { height, weight };
  }

  throw new Error("Provided values are not numbers, please try again.");
};

export const calculateBMI = (
  weight: number,
  height: number
): BMICatergories => {
  if (isNotNumber(weight) || isNotNumber(height)) {
    throw new Error("Provided values are not numbers, please try again.");
  }

  const heightInMeters = height / 100;
  const BMI = weight / Math.pow(heightInMeters, 2);

  if (BMI < 18.5) return "Underweight";
  else if (BMI >= 18.5 && BMI <= 24.9) return "Normal weight";
  else if (BMI >= 25 && BMI <= 29.9) return "Overweight";
  else return "Obesity";
};

try {
  if (require.main === module) {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBMI(weight, height));
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
