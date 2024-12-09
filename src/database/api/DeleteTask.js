async function deleteTask(database, taskId) {
    await database.write(async () => {
        const task = await database.collections.get('tasks').find(taskId);
        await task.markAsDeleted();
        await task.destroyPermanently();
    });

    const taskSummaryCollection = database.collections.get('task_summary');
    await database.write(async () => {
        const taskSummary = await taskSummaryCollection.query().fetch();
        console.log('Task Summary', taskSummary[0]._raw);
        const updatedTaskSummaryData = {
            total: taskSummary[0]._raw.total,
            completed: taskSummary[0]._raw.completed + 1,
            pending: taskSummary[0]._raw.pending - 1,
        };
        if (taskSummary.length > 0) {
            console.log('Tasking ', taskSummary);
            await taskSummary[0].update((task) => {
                task.total = updatedTaskSummaryData.total;
                task.completed = updatedTaskSummaryData.completed;
                task.pending = updatedTaskSummaryData.pending;
            });
        }
    });
}

export { deleteTask };
