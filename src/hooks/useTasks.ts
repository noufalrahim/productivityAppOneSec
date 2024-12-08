import { database } from '../database';
import { useEffect, useState } from 'react';

/**
 * Observes tasks collection for changes and updates UI automatically.
 * @returns {Array} List of tasks that will be updated automatically when data changes.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksCollection = database.collections.get('tasks');

    // Subscribe to the tasks collection
    const subscription = tasksCollection.query().observeWithColumns([
      'title', 'description', 'completed', 'dueTimeStamp', 'category', 'allDay',
    ]).subscribe((tasks) => {
      // Update tasks state when data changes
      const taskList = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        allDay: task.allDay,
        dueTimeStamp: task.dueTimeStamp,
        completed: task.completed,
        category: task.category,
      }));

      setTasks(taskList); // Update the tasks state with the latest data
    });

    // Cleanup the subscription when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return tasks; // Return the tasks to be used in the component
}
