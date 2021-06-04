import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenderIcon from '../components/GenderIcon';
import { apiBaseUrl } from '../constants';
import { setDiagnosisList, setSinglePatient, useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';
import EntryDetails from './EntryDetails';

const SinglePatientPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSinglePatient(singlePatient));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient.id !== id) {
      void fetchSinglePatient();
    }
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div>
      <h1>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
      ))}
    </div>
  );
};

export default SinglePatientPage;
