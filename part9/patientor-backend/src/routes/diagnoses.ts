import express, { Request, Response } from "express";
import diagnosesServices from "../services/diagnosesServices";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
  res.send(diagnosesServices.getDiagnoses());
});

export default router;
