import patientData from "../../data/patientData";
import { NewPatientData, NonSensitivePatientData, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (data: NewPatientData): Patient => {
  const newPatient = {
    id: uuid(),
    ...data,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatientData, addPatient };
