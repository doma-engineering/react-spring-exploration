import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TaskCategories } from '../../Atoms/candidateTableTypes';
import { selectedCategory } from '../../Atoms/Categories';
import ErrorTaskCategoryPage from '../../Pages/ErrorTaskCategoryPage';
import TaskCategoryBespokePage from '../../Pages/TasksCategoryBespokePage';
import TasksCategoryPage from '../../Pages/TasksCategoryPage';

export const TasksCategoryValidator = () => {
    const { CategoryName } = useParams();

    const [returnPage, setReturnPage] = useState(<TasksCategoryPage />);
    const [category, setCategory] = useAtom(selectedCategory);

    useEffect(() => {
        const categoriesValues = Object.values(TaskCategories).map((c) =>
            c.toString()
        );

        // Check is category valid
        if (!categoriesValues.includes(CategoryName ?? '')) {
            setReturnPage(<ErrorTaskCategoryPage />);
            return;
        }

        // Setting category
        setCategory(
            TaskCategories[CategoryName as keyof typeof TaskCategories]
        );

        // Select return category page or Bespoke page
        if (CategoryName === TaskCategories.bespoke) {
            setReturnPage(<TaskCategoryBespokePage />);
            return;
        }
        setReturnPage(<TasksCategoryPage />);
    }, [CategoryName]);

    return returnPage;
};
export default TasksCategoryValidator;
