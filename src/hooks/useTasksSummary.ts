import { database } from '../database';
import { useEffect, useState } from 'react';

/**
 * Observes tasks summary collection for changes and updates UI automatically.
 * @returns {Array} List of tasks summary that will be updated automatically when data changes.
 */

export function useTasksSummary() {
    const [tasksSummary, setTasksSummary] = useState([]);

    useEffect(() => {
        const taskSummaryCollection = database.collections.get('task_summary');

        // Observe changes in specific columns
        const subscription = taskSummaryCollection.query().observeWithColumns([
            'total', 'pending', 'completed',
        ]).subscribe((taskSummaries) => {
            // Map the observed data to the desired format using _raw
            const taskSummaryList = taskSummaries.map((taskSummary) => {
                return ({
                    id: taskSummary._raw.id,  // Access raw data to avoid errors
                    total: taskSummary._raw.total,
                    pending: taskSummary._raw.pending,
                    completed: taskSummary._raw.completed,
                });
            });

            console.log(taskSummaryList);
            setTasksSummary(taskSummaryList);
        });

        // Cleanup the subscription on unmount
        return () => subscription.unsubscribe();

    }, []);

    return tasksSummary;
}
