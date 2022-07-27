import { useAtom } from 'jotai';
import { RiAddFill } from 'react-icons/ri';
import { companyPinnedTasks } from '../../Atoms/Login';

const ButtonAddTask = ({ taskID }: { taskID: string }) => {
    const [tasks, setTasks] = useAtom(companyPinnedTasks);
    const hoverClick = () => {
        if (tasks && !tasks.includes(taskID)) setTasks([...tasks, taskID]);
    };

    const ifDisabled = () => {
        // If user have that task -> return disabled style; else empty string
        return tasks?.includes(taskID)
            ? 'lg:bg-slate-700 lg:hover:bg-slate-700 lg:hover:text-slate-300 bg-slate-700 hover:bg-slate-700 hover:text-slate-300'
            : '';
    };

    return (
        <button
            onClick={hoverClick}
            className="w-full h-full flex justify-center items-center"
        >
            <div className={`btnAccent p-1 md:p-2 lg:hidden ${ifDisabled()}`}>
                <RiAddFill />
            </div>
            <div
                className={`hidden lg:block lg:btnAccent lg:py-2 lg:px-6 ${ifDisabled()}`}
            >
                Get
            </div>
        </button>
    );
};

export default ButtonAddTask;
