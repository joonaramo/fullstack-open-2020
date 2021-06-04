import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react';
import { Diagnosis, HealthCheckEntry } from '../types';

const HealthCheckEntryList: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {
  const getHeartColor = (rating: number): SemanticCOLORS => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return 'green';
    }
  };
  return (
    <List.Item>
      <List.Icon name='doctor' size='huge' verticalAlign='middle' />
      <List.Content>
        <List.Header>{entry.date}</List.Header>
        <List.Description>
          {entry.description}
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          ))}
        </List.Description>
        <Icon
          name='heart'
          color={getHeartColor(entry.healthCheckRating)}
        ></Icon>
      </List.Content>
    </List.Item>
  );
};

export default HealthCheckEntryList;
