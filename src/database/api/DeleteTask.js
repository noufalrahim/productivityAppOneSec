async function deleteTask(database, taskId) {
    await database.write(async () => {
        const task = await database.collections.get('tasks').find(taskId);
        await task.markAsDeleted(); // For permanent deletion: use task.destroyPermanently()
    });
}

export { deleteTask };
k