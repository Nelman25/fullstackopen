import express, { Request, Response } from "express";
import diaryRouter from "./routes/diaries";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here.");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.use("/api/diaries/:id", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
