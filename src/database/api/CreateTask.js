async function createTask(database, title, description, dueTimeStamp, category) {
    await database.write(async () => {
        await database.collections.get('tasks').create((task) => {
            task.title = title;
            task.description = description;
            task.allDay = false;
            task.dueTimeStamp = dueTimeStamp;
            task.completed = false;
            task.category = category;
        });
    });

    const taskSummaryCollection = database.collections.get('task_summary');
    await database.write(async () => {
    const taskSummary = await taskSummaryCollection.query().fetch();
    console.log('Task Summary', taskSummary[0]._raw);
    const updatedTaskSummaryData = {
        total: taskSummary[0]._raw.total + 1,
        completed: taskSummary[0]._raw.completed,
        pending: taskSummary[0]._raw.pending + 1,
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

export { createTask };
