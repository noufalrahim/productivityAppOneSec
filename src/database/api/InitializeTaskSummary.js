import { database } from '../db';

/**
 * Initializes the task summary if it's not already present.
 */
async function initializeTaskSummary() {
    const taskSummaryCollection = database.collections.get('task_summary');
    const existingSummary = await taskSummaryCollection.query().fetch();

    // If no task summary exists, create a new one with default values
    if (existingSummary.length === 0) {
        await database.write(async () => {
            await taskSummaryCollection.create((taskSummary) => {
                taskSummary.total = 0;
                taskSummary.pending = 0;
                taskSummary.completed = 0;
            });
        });
    }
}

export { initializeTaskSummary };
