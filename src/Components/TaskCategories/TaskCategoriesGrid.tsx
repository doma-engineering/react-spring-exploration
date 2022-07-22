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
    const [textSize, setTextSize] = useState(``);
    const [bespokeTextSize, setBespokeTextSize] =
        useState<string>('lg:text-3xl');
    const [typeScriptTextSize, setTypeScriptTextSize] =
        useState<string>('lg:text-7xl');

    useEffect(() => {
        switch (size) {
            case gridSize.sm:
                setContainerSize(`w-16 h-16 m-1
                                  lg:w-24 lg:h-24 lg:m-3`);
                setTextSize('text-4xl lg:text-6xl');
                setTypeScriptTextSize('text-xl lg:text-5xl');
                setBespokeTextSize('text-sm lg:text-xl');
                break;
            case gridSize.base:
                setContainerSize(`w-24 h-24 m-2
                                  lg:w-36 lg:h-36 lg:text-8xl lg:m-4`);
                setTextSize('text-6xl lg:text-6xl');
                setTypeScriptTextSize('text-4xl lg:text-[370%]');
                setBespokeTextSize('text-lg lg:text-[2rem]');
                break;
            case gridSize.xl:
                setContainerSize(`w-32 h-32 m-2
                                  lg:w-48 lg:h-48 lg:m-3`);
                setTextSize(`text-7xl
                             lg:text-9xl`);
                setTypeScriptTextSize(`text-5xl
                                       lg:text-7xl`);
                setBespokeTextSize(`text-2xl
                                    lg:text-5xl`);
        }
    }, [size]);

    return (
        <div className="flex justify-center flex-wrap text-slate-200 text">
            <div
                className={`categoryGridContainer ${containerSize} ${textSize} ${styleModify} active:text-orange-400`}
                onClick={() => setSelectedCategory(TaskCategories.Java)}
            >
                <SiJava />
            </div>
            <div
                className={`categoryGridContainer ${containerSize} ${typeScriptTextSize} ${styleModify} active:text-sky-600 hover:shadow-sky-600`}
                onClick={() => setSelectedCategory(TaskCategories.TypeScript)}
            >
                <SiTypescript />
            </div>
            <div
                className={`categoryGridContainer ${containerSize} ${textSize} ${styleModify} active:text-gray-400 hover:shadow-gray-400`}
                onClick={() => setSelectedCategory(TaskCategories.Haskell)}
            >
                <SiHaskell />
            </div>
            <div
                className={`categoryGridContainer ${containerSize} ${textSize} ${styleModify} active:text-violet-500 hover:shadow-violet-500`}
                onClick={() => setSelectedCategory(TaskCategories.Elixir)}
            >
                <SiElixir />
            </div>
            <div
                className={`categoryGridContainer ${containerSize} ${bespokeTextSize} ${styleModify} text-center active:text-yellow-400 hover:shadow-yellow-400`}
                onClick={() => setSelectedCategory(TaskCategories.bespoke)}
            >
                Bespoke task
            </div>
        </div>
    );
};

export default TaskCategoriesGrid;
