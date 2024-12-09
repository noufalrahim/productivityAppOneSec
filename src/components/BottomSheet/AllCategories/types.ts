import { CategoryNames } from "../../../screens/HomeScreen/type";

export interface AllCategoriesProps {
    onClose: () => void;
    backgroundStyle: {
        backgroundColor: string;
        color: string;
        primary: string;
        secondary: string;
    },
    setRenderItem: (item: 'AllCategories' | 'AddNewTask') => void;
    setChosenCategory: (category: { id: CategoryNames, label: string }) => void;
}
