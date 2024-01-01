// Task.js
import React from 'react';
import axios from 'axios';

const Task = ({ task, index }) => {
  const markCompleted = async () => {
    // Mark task as completed and remove it from the list
    await axios.delete(`http://localhost:3001/tasks/${task._id}`);
  };

  return (
    <div style={{ padding: '8px', border: '1px solid lightgray' }}>
      <p>{task.title}</p>
      <button onClick={markCompleted}>Mark Completed</button>
    </div>
  );
};

export default Task;
