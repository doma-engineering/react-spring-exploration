import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCategoriesGrid from '../Components/TaskCategories/TaskCategoriesGrid';
import { selectedCategory as selectedCategoryAtom } from '../Atoms/Categories';
import { TaskCategories } from '../Atoms/candidateTableTypes';
import { TASKS_BY_CATEGORY_URL } from '../routes';
import { useEffect, useState } from 'react';

const ErrorTaskCategoryPage = () => {
    const navigate = useNavigate();
    const { CategoryName } = useParams();

    const [selectedCategory, setSelectedCategory] =
        useAtom(selectedCategoryAtom);

    const [needClearSelection, setNeedClearSelection] = useState(true);

    useEffect(() => {
        if (needClearSelection) {
            setNeedClearSelection(false);
            setSelectedCategory(TaskCategories.notSelected);
            return;
        }
        if (selectedCategory !== TaskCategories.notSelected) {
            navigate(TASKS_BY_CATEGORY_URL(selectedCategory));
            setNeedClearSelection(true);
        }
    }, [selectedCategory]);

    return (
        <div className="flex flex-col items-center">
            <div className="mt-10 text-slate-200 text-3xl space-y-4 px-4">
                <p>Sorry, we haven't category '{CategoryName}'</p>
                <p>Try select one of category below: </p>
            </div>
            <div className="mt-10">
                <TaskCategoriesGrid />
            </div>
        </div>
    );
};
export default ErrorTaskCategoryPage;
