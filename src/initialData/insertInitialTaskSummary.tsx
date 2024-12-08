import database from '../database/db';

export async function insertInitialTaskSummary() {
  // Use database.write() for wrapping actions in WatermelonDB
  await database.write(async () => {
    const taskSummaryCollection = database.collections.get('task_data');

    // Create a default summary record
    await taskSummaryCollection.create((newSummary) => {
      newSummary.total = 0;
      newSummary.pending = 0;
      newSummary.completed = 0;
      newSummary.updatedAt = Date.now();
      newSummary.createdAt = Date.now();
    });
  });
}
