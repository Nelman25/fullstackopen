import patientData from "../../data/patientData";
import { NonSensitivePatientData } from "../types";

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getNonSensitivePatientData };
