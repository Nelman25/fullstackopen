import { Gender, NewPatientData } from "./types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incocrect or missing gender: " + gender);
  }

  return gender;
};

export const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};
export const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }

  return dateOfBirth;
};
export const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

export const toNewPatientData = (object: unknown): NewPatientData => {
  // type guards...
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatientData: NewPatientData = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatientData;
  }

  throw new Error("Incorrect data: Some fields are missing");
};
