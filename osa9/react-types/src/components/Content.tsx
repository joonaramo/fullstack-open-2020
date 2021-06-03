import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const parts = courseParts.map((part) => {
    switch (part.type) {
      case 'groupProject':
        return (
          <Part
            name={part.name}
            exerciseCount={part.exerciseCount}
            groupProjectCount={part.groupProjectCount}
            type={part.type}
          />
        );
      case 'normal':
        return (
          <Part
            name={part.name}
            exerciseCount={part.exerciseCount}
            type={part.type}
            description={part.description}
          />
        );
      case 'submission':
        return (
          <Part
            name={part.name}
            exerciseCount={part.exerciseCount}
            type={part.type}
            description={part.description}
            exerciseSubmissionLink={part.exerciseSubmissionLink}
          />
        );
      case 'special':
        return (
          <Part
            name={part.name}
            exerciseCount={part.exerciseCount}
            type={part.type}
            description={part.description}
            requirements={part.requirements}
          />
        );
      default:
        return assertNever(part);
    }
  });
  return <div>{parts}</div>;
};

export default Content;
