import { z } from "zod";
import { newEntrySchema } from "./utils";

// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

// export type Visibility = "great" | "good" | "ok" | "poor";
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
// USING TYPE ALIASES
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = z.infer<typeof newEntrySchema>;

// export type NewDiaryEntry = Omit<DiaryEntry, "id">;
