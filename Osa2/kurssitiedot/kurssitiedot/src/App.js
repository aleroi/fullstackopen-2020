import React from 'react';
import Course from './components/course';

const App = ({ courses }) => (
  <>
    <div>
      <h1>Web Development curriculum</h1>
    </div>
    <br/>
    {courses.map( course => <Course key={course.id} course={course} />)}
  </>
)
export default App;