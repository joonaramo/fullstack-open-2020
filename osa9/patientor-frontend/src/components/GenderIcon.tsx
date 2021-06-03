import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

interface GenderProps {
  gender: Gender;
}

const GenderIcon = ({ gender }: GenderProps): JSX.Element => {
  switch (gender) {
    case Gender.Male:
      return <Icon name='mars'></Icon>;
    case Gender.Female:
      return <Icon name='venus'></Icon>;
    case Gender.Other:
      return <Icon name='genderless'></Icon>;
    default:
      return <div></div>;
  }
};

export default GenderIcon;
