import React from 'react';
import { List } from 'semantic-ui-react';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryList: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  return (
    <List.Item>
      <List.Icon name='stethoscope' size='huge' verticalAlign='middle' />
      <List.Content>
        <List.Header>
          {entry.date} • {entry.employerName}
        </List.Header>
        <List.Description>
          {entry.description}
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          ))}
          {entry.sickLeave && (
            <>
              <h3>Sick Leave</h3>
              {entry.sickLeave?.startDate} {entry.sickLeave?.endDate}
            </>
          )}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default OccupationalHealthcareEntryList;
