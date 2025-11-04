// Importing required dependencies and components
import React, { useState, useEffect } from "react";
import backgroundVideo from "./assets/main-bg-video.mp4";
import jarvisVideo from "./assets/heading-bg-video.mp4";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
} from "./services/TaskService";

export default function App() {
  // State for controlling form popup visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State for storing the list of tasks
  const [tasks, setTasks] = useState([]);

  // State to keep track of the task currently being edited
  const [editingTask, setEditingTask] = useState(null);

  // State for managing task filters (All / Pending / Completed)
  const [filter, setFilter] = useState("All");

  // Load all tasks from local storage when app starts
  useEffect(() => {
    setTasks(getTasks());
  }, []);

  // Save or update a task when user submits the form
  const handleSaveTask = (newTask) => {
    if (editingTask) {
      updateTask(newTask); // update existing task
    } else {
      addTask(newTask); // add new task
    }

    // Refresh task list and reset form state
    setTasks(getTasks());
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Delete a task
  const handleDelete = (id) => {
    deleteTask(id);
    setTasks(getTasks());
  };

  // Toggle task completion
  const handleToggle = (id) => {
    toggleComplete(id);
    setTasks(getTasks());
  };

  // Apply filters to show tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  // Count stats for filter badges
  const allCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Header Section */}
      <header className="flex flex-col items-center justify-center py-10">
        <div className="relative w-[700px] h-56 rounded-3xl overflow-hidden shadow-2xl border border-gray-500/30 backdrop-blur-md">
          {/* Small looping animation behind the title */}
          <video
            src={jarvisVideo}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-8xl font-extrabold tracking-wider drop-shadow-lg">
              JARVIS
            </h1>
            <p className="text-gray-200 mt-3 text-lg font-medium tracking-wide animate-pulse">
              Plan smarter. Achieve more. Let{" "}
              <span className="text-blue-400 font-semibold">JARVIS</span>{" "}
              takeover.
            </p>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="px-6 md:px-20">
        {/* Filter buttons and title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-5xl font-extrabold">My Tasks</h2>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            {[
              { name: "All", count: allCount },
              { name: "Pending", count: pendingCount },
              { name: "Completed", count: completedCount },
            ].map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setFilter(name)}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 backdrop-blur-md border transition-all hover:scale-105 ${
                  filter === name
                    ? "bg-emerald-400/20 border-emerald-300/30 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                    : "bg-white/10 border-white/20 text-gray-200 hover:bg-white/20"
                }`}
              >
                {name}
                <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add Task Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-emerald-400/10 text-emerald-300 border border-emerald-300/20 backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.4)] hover:bg-emerald-400/20 transition-all"
          >
            + Add Task
          </button>
        </div>

        {/* Task list section */}
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </main>

      {/* Popup form for adding/editing tasks */}
      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveTask}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}
