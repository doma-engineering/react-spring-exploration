import { useAtom } from 'jotai';
import { RiAddFill } from 'react-icons/ri';
import { companyPinnedTasks } from '../../Atoms/Login';

const ButtonAddTask = ({ taskID }: { taskID: string }) => {
    const [tasks, setTasks] = useAtom(companyPinnedTasks);
    const hoverClick = () => {
        if (tasks && !tasks.includes(taskID)) setTasks([...tasks, taskID]);
    };
    return (
        <button
            onClick={hoverClick}
            className="w-full h-full flex justify-center items-center"
        >
            <div className="btnAccent p-1 md:p-2 lg:hidden">
                <RiAddFill />
            </div>
            <div className="hidden lg:block lg:btnAccent lg:py-2 lg:px-6">
                Get
            </div>
        </button>
    );
};

export default ButtonAddTask;
