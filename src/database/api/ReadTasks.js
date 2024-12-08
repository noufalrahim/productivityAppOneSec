
/**
 * Fetch all tasks from the tasks table.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 */
export async function readTasks(database) {
  try {
    const tasksCollection = database.collections.get('tasks');
    const tasks = await tasksCollection.query().fetch(); // Fetch all tasks

    // Map to a clean JSON structure if needed
    const taskList = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      allDay: task.allDay,
      dueTimeStamp: task.dueTimeStamp,
      completed: task.completed,
      category: task.category,
    }));

    console.log('Tasks fetched successfully:', taskList);
    return taskList;
  } catch (error) {
    console.error('Error reading tasks:', error);
    throw error;
  }
}
