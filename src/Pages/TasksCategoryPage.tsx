import { atom, useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { SiElixir, SiHaskell, SiJava, SiTypescript } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { selectedCategory } from '../Atoms/Categories';
import { companies, tables } from '../Atoms/LoadData';
import { loggedInCompany } from '../Atoms/Login';
import { universalTable } from '../Atoms/UniversalTable';
import UniversalTable from '../Components/UniversalTable/UniversalTable';
import { CANDIDATE_TABLE_URL } from '../routes';

const Logo: Map<string, string | JSX.Element> = new Map<
    string,
    string | JSX.Element
>([
    ['Java', <SiJava />],
    ['TypeScript', <SiTypescript />],
    ['Haskell', <SiHaskell />],
    ['Elixir', <SiElixir />],
    ['bespoke', ''],
]);

const LogoColor: Map<string, string | JSX.Element> = new Map<
    string,
    string | JSX.Element
>([
    ['Java', 'text-orange-400'],
    ['TypeScript', 'text-sky-600'],
    ['Haskell', 'text-gray-400'],
    ['Elixir', 'text-violet-500'],
    ['bespoke', 'text-yellow-400'],
]);

const tableData = atom((get) =>
    get(tables).filter((table) => table.category === get(selectedCategory))
);

const TasksCategoryPage = () => {
    const navigate = useNavigate();

    const tasks = useAtomValue(tableData);
    const [, setUniversalTableValue] = useAtom(universalTable);
    const [companiesData, setCompaniesData] = useAtom(companies);
    const loggedIn = useAtomValue(loggedInCompany);
    const category = useAtomValue(selectedCategory);

    const [addedTask, setAddedTask] = useState<string>('');

    const fillUniversalTable = () => {
        setUniversalTableValue({
            header: {
                content: [
                    'Task name',
                    'Task tier',
                    'Members count',
                    '',
                    '',
                    'You have',
                ],
            },
            body: {
                content: tasks.map((task) => [
                    task.displayName,
                    task.tier,
                    task.table.length,
                    <button
                        className="btnAccent px-5 py-2 z-50"
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
        setAddedTask(taskID);
        //Trigger
    };

    const handleClickLookTask = (taskId: string) => {
        navigate(CANDIDATE_TABLE_URL(taskId));
    };

    useEffect(() => {
        setCompaniesData(
            companiesData.map((company) =>
                company.id === loggedIn.companyId &&
                addedTask !== '' &&
                !company.tables.includes(addedTask)
                    ? { ...company, tables: [...company.tables, addedTask] }
                    : company
            )
        );
    }, [addedTask]);

    useEffect(() => {
        fillUniversalTable();
    }, [companiesData]);

    return (
        <div className="flex justify-between">
            <div className="w-1/6 text-slate-200 text-7xl flex justify-center">
                <div
                    className={
                        LogoColor.has(category)
                            ? `pt-10 ${LogoColor.get(category)}`
                            : 'pt-10'
                    }
                >
                    {Logo.get(category)}
                </div>
            </div>
            <div className="w-5/6 h-screen flex flex-col items-center bg-slate-600/20 shadow-xl shadow-slate-900">
                <div className="pt-10">
                    <UniversalTable />
                </div>
            </div>
            <div className="w-1/6"></div>
        </div>
    );
};
export default TasksCategoryPage;
