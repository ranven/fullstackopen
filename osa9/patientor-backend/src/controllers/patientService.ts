import patientData from '../data/patients';
import { NonSensitivePatient } from '../types';

const nonSensitivePatients: NonSensitivePatient[] = patientData.nonSensitivePatientData;

const getPatients = (): NonSensitivePatient[] => {
    return nonSensitivePatients.map(({  id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    addPatient
};