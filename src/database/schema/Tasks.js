import { tableSchema } from '@nozbe/watermelondb';

export const TasksSchema = tableSchema({
    name: 'tasks',
    columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'all_day', type: 'boolean' },
        { name: 'due_timestamp', type: 'number' },
        { name: 'completed', type: 'boolean' },
        { name: 'category', type: 'string' },
    ],
});


