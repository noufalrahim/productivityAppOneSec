import { tableSchema } from '@nozbe/watermelondb';

export const TaskSummarySchema = tableSchema({
  name: 'task_summary',
  columns: [
    { name: 'total', type: 'number' },
    { name: 'pending', type: 'number' },
    { name: 'completed', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'created_at', type: 'number' },
  ],
});
