import React from 'react';
import { Diagnosis, HospitalEntry } from '../types';
import { List } from 'semantic-ui-react';

const HospitalEntryList: React.FC<{
  entry: HospitalEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <List.Item>
      <List.Icon name='hospital' size='huge' verticalAlign='middle' />
      <List.Content>
        <List.Header>{entry.date}</List.Header>
        <List.Description>
          {entry.description}
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          ))}
          <h3>Discharge</h3>
          {entry.discharge.date} {entry.discharge.criteria}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default HospitalEntryList;
