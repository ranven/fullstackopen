import { useState, SyntheticEvent } from 'react';

import { TextField, Grid, Button, Box, Typography } from '@mui/material';

import { EntryFormValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: 'Hospital',
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  const addDiagnosisCode = () => {
    setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
    setDiagnosisCode('');
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <Box>
          {diagnosisCodes?.map((d: string) => (
            <Typography variant="body1" key={d}>
              {d}
            </Typography>
          ))}
        </Box>
        <TextField
          label="diagnosis"
          fullWidth
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
        />
        <Button onClick={addDiagnosisCode} type="button" variant="contained">
          Add diagnosis
        </Button>

        <TextField
          label="Discharge criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />

        <TextField
          label="Discharge date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
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
              Add entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
