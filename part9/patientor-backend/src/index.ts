import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patient";

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
