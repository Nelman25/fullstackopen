import express, { Request, Response } from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", ({ query }: Request, res: Response) => {
  const { weight, height } = query;

  const h = Number(height);
  const w = Number(weight);

  try {
    res.send({ weight, height, bmi: calculateBMI(w, h) });
  } catch (error: unknown) {
    res
      .status(400)
      .json({
        error:
          error instanceof Error
            ? `Something went wrong: ${error.message}`
            : "malformed parameters.",
      });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.send(calculateExercises(daily_exercises, target));
  } catch (error: unknown) {
    res.status(400).json({
      error:
        error instanceof Error
          ? `Something went wrong: ${error.message}`
          : "malformed parameters",
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
