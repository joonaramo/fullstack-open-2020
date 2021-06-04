import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenderIcon from '../components/GenderIcon';
import { apiBaseUrl } from '../constants';
import { setSinglePatient, useStateValue } from '../state';
import { Patient } from '../types';

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
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
    if (patient.id !== id) {
      void fetchSinglePatient();
    }
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
        <p key={entry.id}>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </p>
      ))}
    </div>
  );
};

export default SinglePatientPage;
