import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { NonSensitiveDiaryEntry } from '../types';

interface Props {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryListPage = ({ diaries }: Props) => {
  return (
    <Box>
      <Typography align="center" variant="h6">
        Diary entries
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Visibility</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <TableBody>
        {Object.values(diaries).map((diary: NonSensitiveDiaryEntry) => (
          <TableRow key={diary.id}>
            <TableCell>{diary.date}</TableCell>
            <TableCell>{diary.weather}</TableCell>
            <TableCell>{diary.visibility}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Box>
  );
};

export default DiaryListPage;
