import express, { Request, Response } from "express";
import patientServices from "../services/patientServices";
import { NonSensitivePatientData } from "../types";
import { toNewPatientData } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientServices.getNonSensitivePatientData());
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatientData(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error." });
    }
  }
});

export default router;
