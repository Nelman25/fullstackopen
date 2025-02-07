import { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <li className="bg-blue px-4 py-2 bg-lime-50 rounded-md shadow-md border border-slate-100">
      <p>
        <strong>Date: </strong>
        <i>{diary.date}</i>
      </p>
      <p>
        <strong>Weather: </strong>
        {diary.weather}
      </p>
      <p>
        <strong>Weather: </strong> {diary.visibility}
      </p>
      {diary.comment && (
        <p>
          <strong>Comments:</strong> <i>`{diary.comment}`</i>
        </p>
      )}
    </li>
  );
};

export default Diary;
