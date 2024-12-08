async function fetchAllTaskSummaries(database) {
    const taskSummaries = await database.collections.get('task_summary').query().fetch();
    return taskSummaries[0]._raw;
}


export { fetchAllTaskSummaries };
