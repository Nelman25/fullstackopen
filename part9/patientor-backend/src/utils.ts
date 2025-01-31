import { Gender, NewPatientData } from "./types";
import { z } from "zod";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatientData = (object: unknown): NewPatientData => {
  return newPatientSchema.parse(object);
};
