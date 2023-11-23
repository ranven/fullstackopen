import { NonSensitiveDiaryEntry } from "../types";

interface Props {
    diaries: NonSensitiveDiaryEntry[]
}

const DiaryListPage = ({diaries} : Props ) => {

    return ( 
        <div>
            <h3>Diary Entries</h3>
            
                {Object.values(diaries).map((diary: NonSensitiveDiaryEntry) => (
                    <div key={diary.id}>
                        <h4>{diary.date}</h4>
                        <p>{diary.weather}</p>
                        <p>{diary.visibility}</p>
                    </div>
                ))}
        </div>
    );
};

export default DiaryListPage;