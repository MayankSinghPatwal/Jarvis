import React from "react";

/**
 * TaskItem - A reusable card component for showing individual task details.
 * Displays task info like name, description, dates, priority, and category.
 * 
 * @param {Object} task - The task details
 * @param {Function} onEdit - Function to open edit form
 * @param {Function} onDelete - Function to delete a task
 */
export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/10 border border-gray-300/20 shadow-md hover:bg-white/20 transition-all p-4 flex flex-col justify-between">
      {/* Task details section */}
      <div>
        <h3 className="text-xl font-semibold mb-1">{task.name}</h3>
        <p className="text-gray-300 text-sm mb-3">{task.description}</p>

        {/* Dates */}
        <div className="flex justify-between text-sm text-gray-400">
          <p>
            <span className="font-semibold text-blue-300">Start:</span> {task.startDate}
          </p>
          <p>
            <span className="font-semibold text-pink-300">End:</span> {task.endDate}
          </p>
        </div>

        {/* Task badges */}
        <div className="flex gap-3 mt-3">
          <span className="px-3 py-1 bg-blue-600/40 border border-blue-500/40 rounded-lg text-sm font-medium">
            {task.priority}
          </span>
          <span className="px-3 py-1 bg-green-600/40 border border-green-500/40 rounded-lg text-sm font-medium">
            {task.category}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 rounded-md bg-yellow-500/80 hover:bg-yellow-600 font-medium text-black transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded-md bg-red-600/80 hover:bg-red-700 font-medium text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
