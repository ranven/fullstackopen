export interface Diagnosis {
    code: string,
    name: string,
    latin?: string 
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }
  
export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: string;
    ssn?: string;
    dateOfBirth?: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
  
