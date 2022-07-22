import { useAtomValue } from 'jotai';
import { selectedCategory } from '../Atoms/Categories';
import TaskCategoriesLogo, {
    TaskCategoriesColors,
} from '../Components/TaskCategories/TasksLogo';
import TasksCategoryTable from '../Components/TasksTable/TaskCategoryTable';

const TasksCategoryPage = () => {
    const category = useAtomValue(selectedCategory);

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
                    <TasksCategoryTable />
                </div>
            </div>
            <div className="sm:w-1/6"></div>
        </div>
    );
};
export default TasksCategoryPage;
