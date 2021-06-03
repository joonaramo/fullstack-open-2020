import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GenderIcon from '../components/GenderIcon';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
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
        dispatch({ type: 'SET_SINGLE_PATIENT', payload: singlePatient });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchSinglePatient();
  }, [dispatch]);

  return (
    <div>
      <h1>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default SinglePatientPage;
