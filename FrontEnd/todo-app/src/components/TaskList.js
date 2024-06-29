import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';
import '../css/TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(task) {
    const response = await axios.post('http://localhost:5000/tasks', { task });
    setTasks([...tasks, response.data]);
  }

  async function updateTask(id, task) {
    const response = await axios.put(`http://localhost:5000/tasks/${id}`, { task });
    setTasks(tasks.map(t => t.id === id ? response.data : t));
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="task-list">
      <TaskForm addTask={addTask} />
      <h2>Tasks</h2>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
