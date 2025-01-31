export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Others = "others",
}

// Patient type without the ssn
export type NonSensitivePatientData = Omit<Patient, "ssn">;
export type NewPatientData = Omit<Patient, "id">;
