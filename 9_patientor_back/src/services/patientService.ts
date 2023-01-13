import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const id = uuid();

import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  Patient,
  NewEntryWithoutId
   } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getPatientById = (id: string): Patient => {
  const patientById = patients.find(p => p.id === id);
  const patient = 
  {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...patientById!
  };
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: id,
    entries: [],
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addPatientEntry = (id: string, entry: NewEntryWithoutId ): Patient => {
  const patient = getPatientById(id);
  const newEntry = {
    id: id,
    ...entry
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addPatientEntry
};