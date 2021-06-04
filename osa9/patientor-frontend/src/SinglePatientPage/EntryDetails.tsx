import React from 'react';
import { Entry, Diagnosis } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import { List } from 'semantic-ui-react';

const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <List divided relaxed>
          <HospitalEntry entry={entry} diagnoses={diagnoses} />
        </List>
      );
    case 'HealthCheck':
      return (
        <List divided relaxed>
          <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
        </List>
      );
    case 'OccupationalHealthcare':
      return (
        <List divided relaxed>
          <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        </List>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
