import React, { useState, useContext } from 'react';
import { EmotionContext } from '../context/EmotionContext';
import emotionThemeMap from '../utils/emotionThemeMap';

const ToDoList = () => {
  const { emotion } = useContext(EmotionContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const themeClass = emotionThemeMap[emotion] || emotionThemeMap['neutral'];

  return (
    <div className={`p-4 rounded-lg shadow-lg ${themeClass} transition-all duration-300`}>
      <h2 className="text-xl font-bold mb-4">📝 To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
          placeholder="Add a task..."
        />
        <button
          onClick={addTask}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className={`flex justify-between items-center px-3 py-2 border rounded ${
              task.completed ? 'line-through opacity-60' : ''
            }`}
          >
            <span>{task.text}</span>
            <div className="flex gap-2">
              <button onClick={() => toggleTask(idx)} title="Complete">✅</button>
              <button onClick={() => deleteTask(idx)} title="Delete">❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
