import express from 'express';
import patientService from '../controllers/patientService';
import { Patient, NewPatient } from '../types';
import toNewPatientEntry from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id: string = req.params.id;
  res.send(patientService.getPatient(id));
});

patientsRouter.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient: NewPatient = toNewPatientEntry(req.body);
  const addedPatient: Patient = patientService.addPatient(newPatient);
  res.send(addedPatient);
});

export default patientsRouter;
