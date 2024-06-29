import React, { useState } from 'react';
import '../css/Task.css';

function Task({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task.task);

  function handleUpdate() {
    updateTask(task.id, newTask);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setNewTask(task.task);
  }

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        ) : (
          <span>{task.task}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="btn">Save</button>
            <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn">Update</button>
            <button onClick={() => deleteTask(task.id)} className="btn btn-delete">Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}

export default Task;
