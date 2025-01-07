interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  // receives an array of command line arguments, returns the MultiplyValues interface
  if (args.length < 4) throw new Error("Not enough arguments!"); // checks if there are enough or too much arguments
  if (args.length > 4) throw new Error("Too many arguments!");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    // checks if the number passed as command line arguments are numbers, if yes, it will assign the values and return it as MultiplyValues
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provide values are not numbers."); // throws an error of atleast one of the arguments is not a number
  }
};

const muliplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv); // passes an array of command line arguments. value1 and value2 are being destructured, returned by parseArguments function
  muliplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is: `
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened. "; // type narrowing because of type "unknown"
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
