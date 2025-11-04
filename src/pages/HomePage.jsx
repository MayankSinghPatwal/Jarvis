import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskService from "../services/TaskService";

/**
 * HomePage - Main page showing tasks and form popup
 * @returns {JSX.Element}
 */
export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = TaskService.getTasks();
    setTasks(savedTasks);
  }, []);

  /**
   * Handles adding or updating a task
   * @param {Object} task - Task data from the form
   */
  const handleAddOrEditTask = (task) => {
    let updatedTasks;
    if (editTask) {
      // Update existing task
      updatedTasks = tasks.map((t) => (t.id === editTask.id ? task : t));
      TaskService.saveTasks(updatedTasks);
      setEditTask(null);
    } else {
      // Add new task
      const newTask = { ...task, id: Date.now() };
      updatedTasks = [...tasks, newTask];
      TaskService.saveTasks(updatedTasks);
    }
    setTasks(updatedTasks);
    setIsFormOpen(false);
  };

  /** Deletes a task */
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    TaskService.saveTasks(updatedTasks);
  };

  /** Opens form for editing */
  const handleEdit = (task) => {
    setEditTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen px-6 md:px-20 text-white">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>

        {/* Add Task Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 font-bold text-white shadow-lg transition transform hover:scale-105"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-gray-300 text-center col-span-full">
            No tasks added yet.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        )}
      </div>

      {/* Popup Form */}
      {isFormOpen && (
        <TaskForm
          onClose={() => {
            setIsFormOpen(false);
            setEditTask(null);
          }}
          onSubmit={handleAddOrEditTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}
