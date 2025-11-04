import React, { useState } from "react";

/**
 * TaskList - Displays a grid of all tasks.
 * Each card includes view, edit, delete, and completion toggle.
 * 
 * @param {Array} tasks - List of all tasks
 * @param {Function} onEdit - Opens edit form for a specific task
 * @param {Function} onDelete - Deletes selected task
 * @param {Function} onToggle - Toggles task completion state
 */
export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  // To handle modal view of selected task
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      {/* Grid of tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-5 rounded-2xl backdrop-blur-md bg-white/5 border border-emerald-400/20 hover:bg-white/10 transition-all flex flex-col justify-between ${
                task.completed ? "opacity-75" : ""
              }`}
            >
              {/* Task header section */}
              <div>
                <div className="flex justify-between items-start">
                  {/* Task title */}
                  <h3
                    className={`text-xl font-semibold tracking-wide ${
                      task.completed ? "line-through text-gray-400" : "text-white"
                    }`}
                  >
                    {task.name}
                  </h3>

                  {/* Priority & Category badges */}
                  <div className="flex gap-2 items-center">
                    <span
                      className={`px-3 py-1 rounded-md text-sm font-medium border backdrop-blur-md ${
                        task.priority === "High"
                          ? "text-red-300 border-red-400/30 bg-red-500/10"
                          : task.priority === "Medium"
                          ? "text-yellow-300 border-yellow-400/30 bg-yellow-500/10"
                          : "text-green-300 border-green-400/30 bg-green-500/10"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-md text-sm font-medium border backdrop-blur-md ${
                        task.category === "Work"
                          ? "text-blue-300 border-blue-400/30 bg-blue-500/10"
                          : task.category === "Personal"
                          ? "text-purple-300 border-purple-400/30 bg-purple-500/10"
                          : "text-teal-300 border-teal-400/30 bg-teal-500/10"
                      }`}
                    >
                      {task.category}
                    </span>
                  </div>
                </div>

                {/* Shortened description */}
                <p className="text-sm text-gray-200 mt-3 line-clamp-3 overflow-hidden break-words leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Footer actions */}
              <div className="flex justify-between items-center mt-5">
                {/* Checkbox for marking complete */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="w-5 h-5 accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-300">Completed</span>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedTask(task)}
                    className="px-4 py-1.5 rounded-md text-emerald-200 border border-emerald-300/20 bg-emerald-400/10 hover:bg-emerald-400/20 transition-all"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(task)}
                    className="px-4 py-1.5 rounded-md text-yellow-200 border border-yellow-300/20 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-4 py-1.5 rounded-md text-red-200 border border-red-300/20 bg-red-400/10 hover:bg-red-400/20 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 col-span-full text-center">
            No tasks yet. Click “Add Task” to create one!
          </p>
        )}
      </div>

      {/* Full task modal when "View" is clicked */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0b1e0f]/90 border border-emerald-400/20 rounded-2xl p-6 w-11/12 sm:w-2/3 lg:w-1/2 text-white">
            <h2 className="text-2xl font-semibold mb-2 text-emerald-300">
              {selectedTask.name}
            </h2>

            {/* Task badges */}
            <div className="flex gap-3 mb-3">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 rounded-md text-sm font-medium">
                {selectedTask.priority}
              </span>
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-400/30 text-blue-300 rounded-md text-sm font-medium">
                {selectedTask.category}
              </span>
            </div>

            {/* Full description */}
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {selectedTask.description}
            </p>

            {/* Close button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-5 py-2 border border-emerald-300/20 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20 rounded-md transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
