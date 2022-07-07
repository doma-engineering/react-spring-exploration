import { useAtom } from 'jotai';
import { SiTypescript, SiJava, SiElixir, SiHaskell } from 'react-icons/si';
import { TaskCategories } from '../../Atoms/candidateTableTypes';
import { selectedCategory } from '../../Atoms/Categories';

const TaskCategoriesGrid = () => {
    const [, setSelectedCategory] = useAtom(selectedCategory);

    return (
        <div className="flex space-x-4">
            <div
                className="categoryGridContainer active:text-orange-400"
                onClick={() => setSelectedCategory(TaskCategories.Java)}
            >
                <SiJava />
            </div>
            <div
                className="categoryGridContainer text-7xl active:text-sky-600 hover:shadow-sky-600"
                onClick={() => setSelectedCategory(TaskCategories.TypeScript)}
            >
                <SiTypescript />
            </div>
            <div
                className="categoryGridContainer active:text-gray-400 hover:shadow-gray-400"
                onClick={() => setSelectedCategory(TaskCategories.Haskell)}
            >
                <SiHaskell />
            </div>
            <div
                className="categoryGridContainer active:text-violet-500 hover:shadow-violet-500"
                onClick={() => setSelectedCategory(TaskCategories.Elixir)}
            >
                <SiElixir />
            </div>
            <div
                className="categoryGridContainer text-4xl text-center active:text-yellow-400 hover:shadow-yellow-400"
                onClick={() => setSelectedCategory(TaskCategories.bespoke)}
            >
                Bespoke task
            </div>
        </div>
    );
};

export default TaskCategoriesGrid;
