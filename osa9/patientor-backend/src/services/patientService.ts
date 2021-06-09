import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatient, EntryWithoutId } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (
  id: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  let missingFields = [];

  if (!entry.date) {
    missingFields.push('date');
  }
  if (!entry.description) {
    missingFields.push('description');
  }
  if (!entry.specialist) {
    missingFields.push('specialist');
  }
  if (!entry.type) {
    missingFields.push('type');
  }
  switch (entry.type) {
    case 'HealthCheck':
      if (!entry.healthCheckRating) {
        missingFields.push('healthCheckRating');
      }
      break;
    case 'Hospital':
      if (!entry.discharge) {
        missingFields.push('discharge');
      }
      break;
    case 'OccupationalHealthcare':
      if (!entry.employerName) {
        missingFields.push('employerName');
      }
      break;
    default:
      break;
  }
  if (missingFields.length > 0) {
    console.log(missingFields);
    throw new Error(`Missing POST fields: ${missingFields.map((f) => f)}`);
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  addEntryToPatient,
  findById,
};
