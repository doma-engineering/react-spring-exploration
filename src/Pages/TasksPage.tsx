import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { universalTable } from '../Atoms/UniversalTable';
import { companies, tables as tablesAtom } from '../Atoms/LoadData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';
import { loggedInCompany } from '../Atoms/Login';
import TaskCategoriesGrid from '../Components/TaskCategories/TaskCategoriesGrid';
import { useNavigate } from 'react-router-dom';
import { selectedCategory as selectedCategoryAtom } from '../Atoms/Categories';
import { CANDIDATE_TABLE_URL, TASKS_BY_CATEGORY_URL } from '../routes';
import { TaskCategories } from '../Atoms/candidateTableTypes';
import { AiOutlineCheck } from 'react-icons/ai';
import UniversalTable from '../Components/UniversalTable/UniversalTable';

const TasksPage = () => {
    const navigate = useNavigate();

    const [, setTableData] = useAtom(universalTable);
    const [companiesData, setCompaniesData] = useAtom(companies);
    const [selectedCategory, setSelectedCategory] =
        useAtom(selectedCategoryAtom);
    const loggedIn = useAtomValue(loggedInCompany);
    const tasks = useAtomValue(tablesAtom);

    const [addedTable, setAddedTable] = useState<string>('');
    const [needClearSelection, setNeedClearSelection] = useState(true);

    const fillTableData = () => {
        setTableData({
            header: {
                content: [
                    'Task name',
                    'Category',
                    'Tier',
                    'Members count',
                    '',
                    '',
                    'You have',
                ],
            },
            body: {
                content: tasks.map((task) => [
                    task.displayName,
                    task.category,
                    task.tier,
                    task.table.length.toString(),
                    <button
                        className="btnAccent px-5 py-2"
                        onClick={() => handleClickGetTask(task.id)}
                    >
                        Get
                    </button>,
                    <button
                        className="btnAccent px-5 py-2 z-50"
                        onClick={() => handleClickLookTask(task.id)}
                    >
                        Look
                    </button>,
                    companiesData
                        .find((company) => company.id === loggedIn.companyId)
                        ?.tables.includes(task.id) ? (
                        <div className="flex w-full justify-center">
                            <AiOutlineCheck />
                        </div>
                    ) : (
                        <></>
                    ),
                ]),
            },
        });
    };

    const handleClickGetTask = (taskID: string) => {
        if (!loggedIn.isLoggedIn) {
            alert('Please enter to ZHR to get tasks!');
        }
        setAddedTable(taskID);
    };

    const handleClickLookTask = (taskId: string) => {
        navigate(CANDIDATE_TABLE_URL(taskId));
    };

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

    useEffect(() => {
        setCompaniesData(
            companiesData.map((company) =>
                company.id === loggedIn.companyId &&
                addedTable !== '' &&
                !company.tables.includes(addedTable)
                    ? { ...company, tables: [...company.tables, addedTable] }
                    : company
            )
        );
    }, [addedTable]);

    useEffect(() => {
        fillTableData();
    }, companiesData);

    useEffect(() => {
        fillTableData();
    }, []);

    return (
        <div className="flex items-center flex-col">
            <div className="mt-10">
                <TaskCategoriesGrid />
            </div>
            <div className="text-center text-stone-200 text-5xl py-5 mt-12">
                Tasks
            </div>
            <div className="flex justify-center mt-5 pb-20">
                <UniversalTable />
            </div>
        </div>
    );
};

export default TasksPage;
