import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { universalTable } from '../Atoms/UniversalTable';
import { companies, tables as tablesAtom } from '../Atoms/LoadData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';
import { loggedInCompany } from '../Atoms/Login';

const TasksPage = () => {
    const [, setTableData] = useAtom(universalTable);
    const tasks = useAtomValue(tablesAtom);
    const [companiesData, setCompaniesData] = useAtom(companies);
    const [addedTable, setAddedTable] = useState<string>('');
    const loggedIn = useAtomValue(loggedInCompany);

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

    const handleClickGetTask = (taskID: string) => {
        if (!loggedIn.isLoggedIn) {
            alert('Please enter to ZHR to get tasks!');
        }
        setAddedTable(taskID);
    };

    useEffect(() => {
        setTableData({
            header: { content: ['Task name', 'member complete count', ''] },
            body: {
                content: tasks.map((task) => [
                    task.displayName,
                    task.table.length.toString(),
                    <button
                        className="btnAccent px-5 py-2"
                        onClick={() => handleClickGetTask(task.id)}
                    >
                        Get
                    </button>,
                ]),
            },
        });
    }, []);

    return <DecorativePageContent PageName="Tasks" />;
};

export default TasksPage;
