async function createTaskSummary(database, total, pending, completed) {
    await database.write(async () => {
        await database.collections.get('task_summary').create((taskSummary) => {
            taskSummary.total = total;
            taskSummary.pending = pending;
            taskSummary.completed = completed;
            taskSummary.createdAt = Date.now();
            taskSummary.updatedAt = Date.now();
        });
    });
}


export { createTaskSummary };
