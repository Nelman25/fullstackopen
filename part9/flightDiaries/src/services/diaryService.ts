import diaries from "../../data/entries";

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// USING OMIT UTILITY TYPE ALLOWS US TO CHOOSE WHICH FIELDS OF AN EXISTING TYPE WE ONLY WANT TO USE.
// const getNonSensitiveDiaries = ():Pick<DiaryEntry,"id" | "date" | "weather" | "visibility" >[] => {
//   //...
// };

// SINCE WE ARE ONLY EXCLUDING A SINGLE FIELD, WE CAN JUST USE "OMIT" UTILITY TYPE
// const getNonSensitiveDiaries = (): Omit<DiaryEntry, "comment">[] => {};

// USING TYPE ALIASES TO IMPROVE READABILITY
const getNonSensitiveDiaries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);

  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveDiaries,
  findById,
};
