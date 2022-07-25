import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { universalTable } from '../Atoms/UniversalTable';
import { fakeUserData } from '../Atoms/mocks/fakeData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';
import { currentPath } from '../Atoms/Login';
import { COMMUNITY_URL } from '../routes';

const CommunityPage = () => {
    const [, setTableData] = useAtom(universalTable);
    const [, setCurrentPath] = useAtom(currentPath);

    useEffect(() => {
        setCurrentPath(COMMUNITY_URL);
    }, []);

    useEffect(() => {
        setTableData({
            header: {
                content: [
                    'User name',
                    'Status',
                    'Task completed',
                    'Programing languages',
                    'Languages',
                ],
            },
            body: {
                content: fakeUserData.map((user) => [
                    user.nick ?? `${user.firstName} ${user.lastName}`,
                    user.status,
                    user.taskCompleted?.length.toString() ?? '0',
                    user.programLanguages?.join(', ') ?? '',
                    user.languages?.join(', ') ?? '',
                ]),
            },
        });
    }, []);

    return <DecorativePageContent PageName="Community" />;
};

export default CommunityPage;
