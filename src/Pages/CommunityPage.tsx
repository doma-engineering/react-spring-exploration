import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { decorativeTable } from '../Atoms/DecorativeTable';
import { fakeUserData } from '../Atoms/mocks/fakeData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';

const CommunityPage = () => {
    const [, setTableData] = useAtom(decorativeTable);

    useEffect(() => {
        setTableData([
            [
                'User name',
                'Status',
                'Task completed',
                'Programing languages',
                'Languages',
            ],
            ...fakeUserData.map((user) => [
                user.nick ?? `${user.firstName} ${user.lastName}`,
                user.status,
                user.taskCompleted?.length.toString() ?? '0',
                user.programLanguages?.join(', ') ?? '',
                user.languages?.join(', ') ?? '',
            ]),
        ]);
    }, []);

    return <DecorativePageContent PageName="Community" />;
};

export default CommunityPage;
