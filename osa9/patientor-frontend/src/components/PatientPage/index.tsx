import { Box, Typography } from '@mui/material';
import { Diagnosis, Entry, Gender, Patient } from '../../types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AndroidIcon from '@mui/icons-material/Android';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
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
    </div>
  );
};

export default PatientPage;
