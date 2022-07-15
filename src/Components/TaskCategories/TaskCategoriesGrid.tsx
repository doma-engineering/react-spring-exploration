import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SiTypescript, SiJava, SiElixir, SiHaskell } from 'react-icons/si';
import { TaskCategories } from '../../Atoms/candidateTableTypes';
import { selectedCategory } from '../../Atoms/Categories';

enum gridSize {
    sm = 'sm',
    base = 'base',
    xl = 'xl',
}

const TaskCategoriesGrid = ({
    size = gridSize.base,
    styleModify,
}: {
    size?: gridSize | string;
    styleModify?: string;
}) => {
    const [, setSelectedCategory] = useAtom(selectedCategory);
    const [containerSize, setContainerSize] = useState<string>('');
    const [textSize, setTextSize] = useState('');
    const [bespokeTextSize, setBespokeTextSize] = useState<string>('text-3xl');
    const [typeScriptTextSize, setTypeScriptTextSize] =
        useState<string>('text-7xl');

    useEffect(() => {
        switch (size) {
            case gridSize.sm:
                setContainerSize('w-24 h-24');
                setTextSize('text-6xl');
                setTypeScriptTextSize('text-5xl');
                setBespokeTextSize('text-xl');
                break;
            case gridSize.xl:
                setContainerSize('w-48 h-48');
                setTextSize('text-9xl');
                setTypeScriptTextSize('text-7xl');
                setBespokeTextSize('text-4xl');
        }
    }, []);

    return (
        <div className="flex space-x-4 text-slate-200 text">
            <div
                className={`categoryGridContainer ${styleModify} ${containerSize} ${textSize} active:text-orange-400`}
                onClick={() => setSelectedCategory(TaskCategories.Java)}
            >
                <SiJava />
            </div>
            <div
                className={`categoryGridContainer ${styleModify} ${containerSize} ${typeScriptTextSize} active:text-sky-600 hover:shadow-sky-600`}
                onClick={() => setSelectedCategory(TaskCategories.TypeScript)}
            >
                <SiTypescript />
            </div>
            <div
                className={`categoryGridContainer ${styleModify} ${containerSize} ${textSize} active:text-gray-400 hover:shadow-gray-400`}
                onClick={() => setSelectedCategory(TaskCategories.Haskell)}
            >
                <SiHaskell />
            </div>
            <div
                className={`categoryGridContainer ${styleModify} ${containerSize} ${textSize} active:text-violet-500 hover:shadow-violet-500`}
                onClick={() => setSelectedCategory(TaskCategories.Elixir)}
            >
                <SiElixir />
            </div>
            <div
                className={`categoryGridContainer ${styleModify} ${containerSize} ${bespokeTextSize} text-center active:text-yellow-400 hover:shadow-yellow-400`}
                onClick={() => setSelectedCategory(TaskCategories.bespoke)}
            >
                Bespoke task
            </div>
        </div>
    );
};

export default TaskCategoriesGrid;
