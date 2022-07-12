import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TaskCategories } from '../../Atoms/candidateTableTypes';
import { selectedCategory } from '../../Atoms/Categories';
import ErrorTaskCategoryPage from '../../Pages/ErrorTaskCategoryPage';
import TasksCategoryPage from '../../Pages/TasksCategoryPage';

export const TasksCategoryValidator = () => {
    const { CategoryName } = useParams();

    const [returnPage, setReturnPage] = useState(<TasksCategoryPage />);
    const [category, setCategory] = useAtom(selectedCategory);

    useEffect(() => {
        const categoriesValues = Object.values(TaskCategories).map((c) =>
            c.toString()
        );
        if (!categoriesValues.includes(CategoryName ?? '')) {
            setReturnPage(<ErrorTaskCategoryPage />);
            return;
        }
        setReturnPage(<TasksCategoryPage />);
        setCategory(
            TaskCategories[CategoryName as keyof typeof TaskCategories]
        );
    }, [CategoryName]);

    return returnPage;
};
export default TasksCategoryValidator;
