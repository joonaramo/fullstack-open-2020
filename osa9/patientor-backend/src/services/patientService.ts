import patients from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array <NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}))
}

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};