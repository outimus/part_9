import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown)
 {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += 'Error. ' + error.message;
  }
  res.status(400).send(errorMessage);
 }
});
// to add a new entry for a patient
router.post('/:id/entries', (req, res) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = patientService.addPatientEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error. ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;