  
import React from 'react';

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
)

const Header = ({ course }) => (
  <div>
    <h2>{course.name}</h2>
  </div>
)

const Content = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      {course.parts.map( part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )}

const Part = ({ part, exercises}) => (
    <p>
      {part} {exercises}
    </p>
)

export default Course;