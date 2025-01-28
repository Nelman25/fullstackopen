import diaries from "../../data/entries";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

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

const addDiary = () => {
  return null;
};

export default { getEntries, addDiary, getNonSensitiveDiaries };
