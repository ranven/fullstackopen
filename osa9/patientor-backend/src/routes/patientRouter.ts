import express from 'express';
import patientService from '../controllers/patientService';
import { Patient, NewPatient, NoIdEntry, Entry } from '../types';
import entryParser from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.send(patientService.getPatient(id));
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.getPatient(id);

  if (patient.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: NoIdEntry = entryParser.toNewEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const addedEntry: Entry = patientService.addEntry(patient[0], newEntry);
    res.send(addedEntry);
  }
});

patientsRouter.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient: NewPatient = entryParser.toNewPatientEntry(req.body);
  const addedPatient: Patient = patientService.addPatient(newPatient);
  res.send(addedPatient);
});

export default patientsRouter;
