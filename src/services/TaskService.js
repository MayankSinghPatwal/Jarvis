/**
 * Get all tasks from localStorage
 * @returns {Array} list of tasks
 */
export const getTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

/**
 * Add a new task to localStorage
 * @param {Object} task - task details
 */
export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    ...task,
    id: Date.now(), // unique id
    completed: false,
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/**
 * Update an existing task in localStorage
 * @param {Object} updatedTask - task with updated values
 */
export const updateTask = (updatedTask) => {
  const tasks = getTasks().map((t) =>
    t.id === updatedTask.id ? updatedTask : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/**
 * Delete a task by ID
 * @param {number} id - task id
 */
export const deleteTask = (id) => {
  const tasks = getTasks().filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

/**
 * Toggle task completion status
 * @param {number} id - task id
 */
export const toggleComplete = (id) => {
  const tasks = getTasks().map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};