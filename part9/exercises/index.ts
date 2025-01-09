import express, { Request, Response } from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", ({ query }: Request, res: Response) => {
  const { weight, height } = query;

  const h = Number(height);
  const w = Number(weight);

  try {
    res.send({ weight, height, bmi: calculateBMI(w, h) });
  } catch {
    res.status(400).json({ error: "malformed parameters." });
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
