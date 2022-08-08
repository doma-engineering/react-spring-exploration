import { useAtom, useAtomValue } from 'jotai';
import { ReactNode, useEffect } from 'react';
import { selectedCategory } from '../Atoms/Categories';
import { currentPath } from '../Atoms/Login';
import TaskCategoriesLogo, {
    TaskCategoriesColors,
} from '../Components/TaskCategories/TasksLogo';
import TasksCategoryTable from '../Components/TasksTable/TaskCategoryTable';
import { TASKS_BY_CATEGORY_URL } from '../routes';

const TasksCategoryPage = ({ header }: { header?: ReactNode }) => {
    const [, setCurrentPath] = useAtom(currentPath);
    const category = useAtomValue(selectedCategory);

    useEffect(() => {
        setCurrentPath(TASKS_BY_CATEGORY_URL(category));
    }, []);

    return (
        <div className="flex justify-between">
            <div className="w-1/6 text-slate-200 text-4xl sm:text-5xl md:text-7xl flex justify-center">
                <div
                    className={
                        TaskCategoriesLogo.has(category)
                            ? `pt-10 ${TaskCategoriesColors.get(category)} m-2`
                            : 'pt-10'
                    }
                >
                    {TaskCategoriesLogo.get(category)}
                </div>
            </div>
            <div className="w-5/6 h-screen flex flex-col items-center bg-slate-600/20 shadow-xl shadow-slate-900">
                <div className="pt-10">
                    {header}
                    <TasksCategoryTable />
                </div>
            </div>
            <div className="sm:w-1/6"></div>
        </div>
    );
};
export default TasksCategoryPage;
