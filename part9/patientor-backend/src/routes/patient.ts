import express, { Request, Response } from "express";
import patientServices from "../services/patientServices";
import { NonSensitivePatientData } from "../types";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientData[]>) => {
  res.send(patientServices.getNonSensitivePatientData());
});

export default router;
