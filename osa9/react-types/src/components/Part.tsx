import React from 'react';

interface PartProps {
  name: string;
  exerciseCount: number;
  groupProjectCount?: number;
  description?: string;
  type: string;
  exerciseSubmissionLink?: string;
  requirements?: Array<string>;
}

const Part = ({
  name,
  exerciseCount,
  groupProjectCount,
  description,
  exerciseSubmissionLink,
}: PartProps) => {
  return (
    <div>
      <b>
        {name} {exerciseCount}
      </b>
      {groupProjectCount && <p>project exercises {groupProjectCount}</p>}
      {description && (
        <p>
          <i>{description}</i>
        </p>
      )}
      {exerciseSubmissionLink && <p>submit to {exerciseSubmissionLink}</p>}
    </div>
  );
};

export default Part;
