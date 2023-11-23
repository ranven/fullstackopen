import { useEffect, useState } from 'react';
import DiaryListPage from './components/DiaryList';
import { DiaryFormValues, NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaries';
import AddDiaryForm from './components/DiaryForm';
import axios from 'axios';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };

    void fetchDiaryList();
  }, []);

  const submitNewDiary = async (values: DiaryFormValues) => {
    try {
      const diary = await diaryService.create({ id: Math.random(), ...values });
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <DiaryListPage diaries={diaries}></DiaryListPage>
      <br />
      <p style={{ color: 'red' }}>{error}</p>
      <AddDiaryForm onSubmit={submitNewDiary}></AddDiaryForm>
    </div>
  );
};

export default App;
