import express from 'express';
import diagnosisService from '../controllers/diagnosisService';
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
});

export default diagnosesRouter;