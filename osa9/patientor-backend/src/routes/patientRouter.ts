import express from 'express';
import patientService from '../controllers/patientService';
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

export default patientsRouter;