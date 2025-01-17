export type Operation = "multiply" | "add" | "divide";
type Result = string | number;

export const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) return "Can't divide by 0!";
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  console.log(calculator(9, 14, "multiply"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

