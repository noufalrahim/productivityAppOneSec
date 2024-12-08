async function updateTask(database, taskId, updatedFields) {
    // Ensure we are not including 'id' in updatedFields as it's read-only
    const { id, ...fieldsToUpdate } = updatedFields;

    await database.write(async () => {
        const task = await database.collections.get('tasks').find(taskId);

        // Update the task with the fields passed in updatedFields
        await task.update((taskRecord) => {
            Object.assign(taskRecord, fieldsToUpdate);
        });
    });
}

export { updateTask };
