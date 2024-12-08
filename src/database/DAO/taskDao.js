import { database } from '../db';

const tasks = database.collections.get('tasks');
console.log('tasks', tasks);

export default {
    observeTasks: () => tasks.query().observe(),
    createTask: async ({ title, description, allDay, dueTimeStamp, completed, category }) => {
        return await database.action(async () => {
            await tasks.create(task => {
                task.title = title;
                task.description = description;
                task.allDay = allDay;
                task.dueTimeStamp = dueTimeStamp;
                task.completed = completed;
                task.category = category;
            });
        });
    },
    deleteAllTasks: async () => {
        return await database.action(async () => {
            await tasks.query().destroyAllPermanently();
        });
    },
};
