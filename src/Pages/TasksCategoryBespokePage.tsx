import { useAtom } from 'jotai';
import { isOpenNewTaskCreating } from '../Atoms/Categories';
import TasksCategoryPage from './TasksCategoryPage';
import AddBespokeTaskForm from '../Components/TaskCategories/AddBespokeTaskForm';

const TaskCategoryBespokePage = () => {
    const [isOpenAddTask, setIsOpenAddTask] = useAtom(isOpenNewTaskCreating);
    const handleClick = () => setIsOpenAddTask(true);
    const handleCancel = () => setIsOpenAddTask(false);
    return (
        <TasksCategoryPage
            header={
                isOpenAddTask ? (
                    <AddBespokeTaskForm onCancel={handleCancel} />
                ) : (
                    <div className="flex justify-center">
                        <button className="btnAccent" onClick={handleClick}>
                            Add task
                        </button>
                    </div>
                )
            }
        />
    );
};

export default TaskCategoryBespokePage;
