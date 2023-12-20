import axios from 'axios';
import { EntryFormValues, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
  return data[0];
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (object: EntryFormValues, id: string) => {
  const { data } = await axios.post<NoIdEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry,
};
