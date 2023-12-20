import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewPatient,
  NoIdEntry,
  SickLeave,
} from './types';

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'occupation' in object &&
    'gender' in object &&
    'dateOfBirth' in object &&
    'ssn' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      occupation: parseName(object.occupation),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      entries: [],
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are mising.');
};

const toNewEntry = (object: unknown): NoIdEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object) {
    const newBaseEntry: NewBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ('diagnosisCodes' in object) {
      newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }

    if ('type' in object) {
      switch (object.type) {
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            const OccupationalHealthcareEntry: NoIdEntry = {
              ...newBaseEntry,
              type: 'OccupationalHealthcare',
              employerName: parseName(object.employerName),
            };

            if ('sickLeave' in object) {
              OccupationalHealthcareEntry.sickLeave = parseSickLeave(
                object.sickLeave
              );
            }
            return OccupationalHealthcareEntry;
          }
          throw new Error('Missing data: employer name is missing');

        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            const healthCheckEntry: NoIdEntry = {
              ...newBaseEntry,
              type: 'HealthCheck',
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              ),
            };
            return healthCheckEntry;
          }
          throw new Error('Missing data: health check rating is missing');

        case 'Hospital':
          if ('discharge' in object) {
            const hospitalEntry: NoIdEntry = {
              ...newBaseEntry,
              type: 'Hospital',
              discharge: parseDischarge(object.discharge),
            };

            return hospitalEntry;
          }
          throw new Error('Missing data: discharge is missing');
      }
    }
    throw new Error('Missing data: entry is missing type');
  }

  throw new Error('Missing data');
};

//parsers

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

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('criteria' in object && 'date' in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return discharge;
  }
  throw new Error('Incorrect data: discharge is missing fields');
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('startDate' in object && 'endDate' in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }

  throw new Error(
    'Incorrect data: sick leave start date or end date is missing'
  );
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrect data: incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

//type validators

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export default { toNewPatientEntry, toNewEntry };
