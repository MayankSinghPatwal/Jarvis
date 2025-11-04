import React, { useState, useEffect } from "react";

/**
 * TaskForm - Popup form component for adding or editing a task.
 * It handles both creating new tasks and updating existing ones.
 * 
 * @param {Function} onClose - Function to close the popup form
 * @param {Function} onSave - Function to save or update the task
 * @param {Object} editingTask - If present, fills the form with existing task details
 */
export default function TaskForm({ onClose, onSave, editingTask }) {
  // Form data state for all task fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    category: "",
  });

  // When editing an existing task, pre-fill the form with its data
  useEffect(() => {
    if (editingTask) setFormData(editingTask);
  }, [editingTask]);

  // Handle input value changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission and pass data back to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Main popup container  */}
      <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 border border-blue-500/30 backdrop-blur-2xl shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[420px] text-white">
        <h2 className="text-3xl font-bold mb-5 text-center text-blue-400 drop-shadow-md tracking-wide">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        {/* Task form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Task Name Input */}
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Task Name"
            className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
            required
          />

          {/* Task Description Input */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
            required
          />

          {/* Date Range Inputs */}
          <div className="flex justify-between gap-3">
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
              required
            />
            <input
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              type="date"
              className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
              required
            />
          </div>

          {/* Priority Dropdown */}
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
            required
          >
            <option value="" disabled hidden>
              Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-gray-900/50 border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
            required
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800/60 hover:bg-gray-700/70 border border-blue-500/20 text-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold shadow-md transition-all"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
