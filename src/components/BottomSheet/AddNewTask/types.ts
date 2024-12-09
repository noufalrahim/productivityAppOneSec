import { CategoryNames, TaskListType } from '../../../screens/HomeScreen/type';

export interface AddNewTaskProps {
    backgroundStyle: {
        backgroundColor: string;
        color: string;
        primary: string;
        secondary: string;
    };
    category: {
        id: CategoryNames;
        label: string;
    };
    onClose: () => void;
    fetchTasksSummary: () => void;
    respData: TaskListType | undefined;
    setRenderItem: (item: 'AddNewTask' | 'AllCategories') => void;
}
