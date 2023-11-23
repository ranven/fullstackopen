import { useEffect, useState } from "react";
import DiaryListPage from "./components/DiaryList";
import { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };

    void fetchDiaryList();
  }, []);

  return (
    <div>
      <DiaryListPage diaries={diaries}></DiaryListPage>
    </div>
  );
};

export default App;