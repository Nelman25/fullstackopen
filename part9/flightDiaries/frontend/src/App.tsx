import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries } from "./services";
import Diary from "./components/Diary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => setDiaries(data));
  }, []);

  return (
    <div className="bg-lime-500 w-screen h-screen flex justify-center items-center ">
      <div className="bg-white p-8 w-1/2 rounded-md shadow-xl max-h-[80%] flex flex-col max-w-[1440px] min-w-[820px] border border-slate-300">
        <h1 className="text-3xl font-semibold mb-6">Diary Entries</h1>
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-4 ">
            {diaries.map((diary) => (
              <Diary key={diary.id} diary={diary} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
