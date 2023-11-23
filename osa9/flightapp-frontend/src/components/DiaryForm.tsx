import { SyntheticEvent, useState } from 'react';
import { DiaryFormValues, Visibility, Weather } from '../types';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';

interface Props {
  onSubmit: (values: DiaryFormValues) => void;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

const AddDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Sunny);

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find(
        (w) => w.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      weather,
      visibility,
      comment,
    });
    resetForm();
  };

  const resetForm = () => {
    setDate('');
    setComment('');
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
  };

  return (
    <div>
      <Box>
        <Typography align="center" variant="h6">
          Add new diary
        </Typography>
      </Box>
      <form onSubmit={addDiary}>
        <TextField
          label="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="Comment"
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
        >
          {weatherOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
        >
          {visibilityOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={() => resetForm()}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiaryForm;
