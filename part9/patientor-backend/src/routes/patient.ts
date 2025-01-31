import express, { Request, Response } from "express";
import patientServices from "../services/patientServices";
import { NonSensitivePatientData, Patient } from "../types";
import { toNewPatientData } from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientServices.getNonSensitivePatientData());
});

router.post("/", (req: Request, res: Response<Patient | string>) => {
  try {
    const newPatient = toNewPatientData(req.body);
    const addedPatient = patientServices.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
