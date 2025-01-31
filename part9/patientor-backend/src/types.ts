import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient extends NewPatientData {
  id: string;
}

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: string;
//   occupation: string;
// }

export enum Gender {
  Male = "male",
  Female = "female",
  Others = "other",
}

// Patient type without the ssn
export type NonSensitivePatientData = Omit<Patient, "ssn">;
export type NewPatientData = z.infer<typeof newPatientSchema>;
