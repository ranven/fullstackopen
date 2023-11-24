import patientData from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const nonSensitivePatients: NonSensitivePatient[] =
  patientData.nonSensitivePatients;

const patients: Patient[] = patientData.patientData;

const getPatients = (): NonSensitivePatient[] => {
  return nonSensitivePatients.map(
    ({ id, name, occupation, gender, dateOfBirth }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
    })
  );
};

const getPatient = (id: string): Patient[] => {
  return patients
    .map(({ id, name, occupation, ssn, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      ssn,
      gender,
      dateOfBirth,
      entries,
    }))
    .filter((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient) => {
  const newPatientEntry: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    name: patient.name,
    occupation: patient.occupation,
    gender: patient.gender,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    entries: [],
  };
  patientData.nonSensitivePatients.push(newPatientEntry);
  patientData.patientData.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
