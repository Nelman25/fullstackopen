import express, { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveDiaries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
