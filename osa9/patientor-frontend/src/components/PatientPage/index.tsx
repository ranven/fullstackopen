import { Box, Typography } from '@mui/material';
import { Gender, Patient } from '../../types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AndroidIcon from '@mui/icons-material/Android';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
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

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          {patient?.name} {genderIcon(patient?.gender)}
        </Typography>
        <p>gender: {patient?.gender}</p>
        <p>ssh: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </Box>
    </div>
  );
};

export default PatientPage;
