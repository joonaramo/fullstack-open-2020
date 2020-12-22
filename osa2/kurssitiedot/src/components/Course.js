import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, obj) => acc + obj.exercises, 0);
  return <b>total of {total} exercises</b>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
