import { atom, useAtomValue } from 'jotai';
import { CandidateTable, TaskTiers } from '../../Atoms/candidateTableTypes';
import { companyPinnedTasks, loggedInCompany } from '../../Atoms/Login';
import TaskCategoriesLogo from '../TaskCategories/TasksLogo';
import ButtonAddTask from './ButtonAddTask';
import ButtonShowTask from './ButtonShowTask';
import { AiOutlineCheck } from 'react-icons/ai';
import Tippy from '@tippyjs/react';
import { tables } from '../../Atoms/LoadData';
import { selectedCategory } from '../../Atoms/Categories';

const categoryTasks = atom((get) =>
    get(tables).filter((table) => table.category === get(selectedCategory))
);

const TasksCategoryTable = () => {
    const tasks = useAtomValue(categoryTasks);
    const pinnedTasks = useAtomValue(companyPinnedTasks);
    const company = useAtomValue(loggedInCompany);

    const category = (task: CandidateTable) => {
        return (
            <div className="lg:flex lg:w-full lg:justify-start">
                <div className="lg:pl-3">
                    {TaskCategoriesLogo.get(task.category)}
                </div>
                <div className="hidden lg:block lg:ml-3 lg:text-base">
                    {task.category}
                </div>
            </div>
        );
    };
    const tierFormat = (task: CandidateTable) => {
        switch (task.tier) {
            case TaskTiers.base:
                return 'base';
            case TaskTiers.new:
                return 'new';
            case TaskTiers.bespoke:
                return 'cust';
        }
        return task.tier;
    };
    const memberCount = (task: CandidateTable) => task.table.length;
    const buttonAdd = (task: CandidateTable) => (
        <ButtonAddTask taskID={task.id} />
    );
    const buttonShow = (task: CandidateTable) => (
        <ButtonShowTask taskID={task.id} />
    );
    const youHave = (task: CandidateTable) => {
        return pinnedTasks?.includes(task.id) ? (
            <AiOutlineCheck />
        ) : (
            <div className="sm:hidden">
                <ButtonAddTask taskID={task.id} />
            </div>
        );
    };

    return (
        <div className="tableDiv m-2 lg:p-5">
            <div className="tableDivHeaderRow">
                <div
                    className="tableDivHeaderCell
                                w-20 pl-2 text-left
                                sm:w-20
                                md:w-36 md:pl-5
                                lg:w-48"
                >
                    <div className="md:hidden">Name</div>
                    <div className="hidden md:block">Task name</div>
                </div>
                <div
                    className="tableDivHeaderCell
                                w-10
                                sm:w-20
                                md:w-20
                                lg:w-24"
                >
                    Your
                </div>
                <div
                    className="tableDivHeaderCell
                                hidden
                                sm:block sm:w-20
                                md:w-20
                                lg:w-24"
                >
                    <div className="lg:hidden">Add</div>
                </div>
                <div
                    className="tableDivHeaderCell
                                w-12
                                sm:w-20
                                md:w-20
                                lg:w-56"
                >
                    <div className="lg:hidden">Tier</div>
                    <div className="hidden lg:block">Task tier</div>
                </div>
                <div
                    className="tableDivHeaderCell
                                w-12 
                                sm:w-20
                                md:w-20
                                lg:w-28"
                >
                    <div className="lg:hidden">Users</div>
                    <div className="hidden lg:block">Members</div>
                </div>
                <div
                    className="tableDivHeaderCell
                                w-10 
                                sm:w-20
                                md:w-20
                                lg:w-24"
                >
                    <div className="lg:hidden">Show</div>
                </div>
            </div>
            {tasks.map((task) => (
                <div className="tableDivRow" key={task.id}>
                    <div
                        className="tableDivCell
                                    w-20 justify-start p-2
                                    sm:w-20
                                    md:w-36 md:pl-5
                                    lg:w-48"
                    >
                        {task.displayName}
                    </div>
                    <div
                        className="tableDivCell
                                    w-10
                                    sm:w-20
                                    md:w-20
                                    lg:w-24"
                    >
                        {youHave(task)}
                    </div>
                    <Tippy
                        trigger="click"
                        className="bg-red-500/50 px-3 py-1 rounded text-stone-200"
                        content="Please enter to ZHR to get tasks!"
                        offset={[0, -10]}
                        delay={0}
                        disabled={company.isLoggedIn}
                    >
                        <div
                            className="tableDivCell
                                    hidden
                                    sm:flex sm:w-20
                                    md:w-20
                                    lg:w-24"
                        >
                            {buttonAdd(task)}
                        </div>
                    </Tippy>
                    <div
                        className="tableDivCell
                                    w-12
                                    sm:w-20
                                    md:w-20
                                    lg:w-56"
                    >
                        {tierFormat(task)}
                    </div>
                    <div
                        className="tableDivCell
                                    w-12
                                    sm:w-20
                                    md:w-20
                                    lg:w-28"
                    >
                        {memberCount(task)}
                    </div>
                    <div
                        className="tableDivCell
                                    w-10
                                    sm:w-20
                                    md:w-20
                                    lg:w-24"
                    >
                        {buttonShow(task)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TasksCategoryTable;
