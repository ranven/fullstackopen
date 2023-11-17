import patientData from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const nonSensitivePatients: NonSensitivePatient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
    return nonSensitivePatients.map(({  id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};

const addPatient = (patient: NewPatient) => {
    const newPatientEntry: Patient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        name: patient.name,
        occupation: patient.occupation,
        gender: patient.gender,
        ssn: patient.ssn,
        dateOfBirth: patient.dateOfBirth
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    addPatient
};