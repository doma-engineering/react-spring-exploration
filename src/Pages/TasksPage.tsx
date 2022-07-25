import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import TaskCategoriesGrid from '../Components/TaskCategories/TaskCategoriesGrid';
import { useNavigate } from 'react-router-dom';
import { selectedCategory as selectedCategoryAtom } from '../Atoms/Categories';
import { TASKS_BY_CATEGORY_URL, TASKS_URL } from '../routes';
import { TaskCategories } from '../Atoms/candidateTableTypes';
import TasksTable from '../Components/TasksTable/TasksTable';
import { currentPath } from '../Atoms/Login';

const TasksPage = () => {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] =
        useAtom(selectedCategoryAtom);
    const [, setCurrentPath] = useAtom(currentPath);

    const [needClearSelection, setNeedClearSelection] = useState(true);

    useEffect(() => {
        setCurrentPath(TASKS_URL);
    }, []);

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
        <div className="flex items-center flex-col">
            <div className="mt-10 w-[22rem] sm:w-full">
                <TaskCategoriesGrid />
            </div>
            <div className="text-center text-stone-200 text-5xl py-5 mt-0">
                Tasks
            </div>
            <div className="flex justify-center mt-5 pb-20">
                <TasksTable />
            </div>
        </div>
    );
};

export default TasksPage;
