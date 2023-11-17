import { Gender, NewPatient } from "./types";

const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object && 'ssn' in object) {
        const newEntry: NewPatient = {
            name: parseName(object.name),
            occupation: parseName(object.occupation),
            gender: parseGender(object.gender),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn)
        };
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are mising.');
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender.');
    } 
    return gender; 
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;