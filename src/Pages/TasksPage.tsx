import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { decorativeTable } from '../Atoms/DecorativeTable';
import { tables as tablesAtom } from '../Atoms/LoadData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';

const TasksPage = () => {
    const [, setTableData] = useAtom(decorativeTable);
    const tables = useAtomValue(tablesAtom);

    useEffect(() => {
        setTableData([
            ['Task name', 'member complete count'],
            ...tables.map((table) => [
                table.displayName,
                table.table.length.toString(),
            ]),
        ]);
    }, []);

    return <DecorativePageContent PageName="Tasks" />;
};

export default TasksPage;
