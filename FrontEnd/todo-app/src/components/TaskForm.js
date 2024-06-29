import React, { useState } from 'react';
import '../css/TaskForm.css';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="btn">Add</button>
    </form>
  );
}

export default TaskForm;
