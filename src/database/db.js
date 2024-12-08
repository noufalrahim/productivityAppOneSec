import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema } from '@nozbe/watermelondb';
import { TaskSummary } from './model/TaskSummary.js';
import { Task } from './model/Task.js';
import { TaskSummarySchema } from './schema/TaskSummary.js';
import { TasksSchema } from './schema/Tasks.js';

const schema = appSchema({
  version: 1,
  tables: [TaskSummarySchema, TasksSchema],
});

const adapter = new SQLiteAdapter({
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: [TaskSummary, Task],
});
