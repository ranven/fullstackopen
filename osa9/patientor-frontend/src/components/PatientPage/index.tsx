import { Box, Button, Typography } from '@mui/material';
import {
  Diagnosis,
  Entry,
  EntryFormValues,
  Gender,
  Patient,
} from '../../types';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AndroidIcon from '@mui/icons-material/Android';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatient();
    void fetchDiagnoses();
  }, []);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const genderIcon = (gender: Gender | undefined) => {
    switch (gender) {
      case 'female':
        return <FemaleIcon />;
      case 'male':
        return <MaleIcon />;
      default:
        return <AndroidIcon />;
    }
  };

  const findDiagnosis = (diagnosisCode: string) => {
    return diagnoses?.find((diagnosis) => {
      return diagnosis.code === diagnosisCode;
    });
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const entry = await patientService.createEntry(values, id);
        setDiagnoses(diagnoses.concat(entry));
        setModalOpen(false);
      }
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
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          {patient?.name} {genderIcon(patient?.gender)}
        </Typography>
        <p>gender: {patient?.gender}</p>
        <p>ssh: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>

        <Typography align="center" variant="h6">
          entries
        </Typography>
        {patient?.entries?.map((entry: Entry) => (
          <div>
            <p>
              <b>{entry.date}</b> {entry.description}
            </p>
            {entry.diagnosisCodes?.map((diagnosisCode: string) => (
              <ul>
                <li>
                  {diagnosisCode + ' ' + findDiagnosis(diagnosisCode)?.name}
                </li>
              </ul>
            ))}
          </div>
        ))}
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
