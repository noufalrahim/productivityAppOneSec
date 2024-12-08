import database from '../database/db';
import { TaskData, Tasks } from '../database/model/model';

// Sample data to insert
const taskData = {
  total: 10,
  pending: 9,
  completed: 1,
  updatedAt: 1614556800000,
  createdAt: 1614556800000,
};

const tasks = [
  {
    title: 'Drink 5L Water',
    description: 'Description 1',
    allDay: false,
    dueTimeStamp: 1733328000,
    completed: false,
    category: 'HEALTH',
  },
  {
    title: 'Submit Assignment',
    description: 'Description 2',
    allDay: false,
    dueTimeStamp: 1590019200,
    completed: false,
    category: 'EDUCATIONAL',
  },
  {
    title: 'Book Train Tickets',
    description: 'Description 3',
    allDay: false,
    dueTimeStamp: 1614729600000,
    completed: false,
    category: 'WORK',
  },
  {
    title: 'Buy Groceries',
    description: 'Description 4',
    allDay: false,
    dueTimeStamp: 1614816000000,
    completed: false,
    category: 'HOUSE',
  },
  {
    title: 'Write Journal',
    description: 'Description 5',
    allDay: false,
    dueTimeStamp: 1614902400000,
    completed: false,
    category: 'PERSONAL',
  },
  {
    title: 'Clean Windows',
    description: 'Description 6',
    allDay: false,
    dueTimeStamp: 1614988800000,
    completed: false,
    category: 'HOUSE',
  },
  {
    title: 'Exam Prep',
    description: 'Description 7',
    allDay: false,
    dueTimeStamp: 1615075200000,
    completed: false,
    category: 'EDUCATIONAL',
  },
  {
    title: 'Task 8',
    description: 'Description 8',
    allDay: false,
    dueTimeStamp: 1615161600000,
    completed: false,
    category: 'WORK',
  },
  {
    title: 'Task 9',
    description: 'Description 9',
    allDay: false,
    dueTimeStamp: 1615248000000,
    completed: false,
    category: 'WORK',
  },
  {
    title: 'Task 10',
    description: 'Description 10',
    allDay: false,
    dueTimeStamp: 1615334400000,
    completed: true,
    category: 'PERSONAL',
  },
];

export async function insertData() {
  await database.write(async () => {
    // Insert task data
    const taskDataModel = await database.get('task_data').create((taskDataModel) => {
      taskDataModel.total = taskData.total;
      taskDataModel.pending = taskData.pending;
      taskDataModel.completed = taskData.completed;
      taskDataModel.updatedAt = taskData.updatedAt;
      taskDataModel.createdAt = taskData.createdAt;
    });

    // Insert tasks
    for (const task of tasks) {
      await database.get('tasks').create((taskModel) => {
        taskModel.title = task.title;
        taskModel.description = task.description;
        taskModel.allDay = task.allDay;
        taskModel.dueTimeStamp = task.dueTimeStamp;
        taskModel.completed = task.completed;
        taskModel.category = task.category;
      });
    }
  });
}
