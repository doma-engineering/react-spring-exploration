import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { universalTable } from '../Atoms/UniversalTable';
import { companies as companiesAtom } from '../Atoms/LoadData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';
import { useNavigate } from 'react-router-dom';
import { HIRING_CAMPAIGNS_URL } from '../routes';

const CompaniesPage = () => {
    const navigate = useNavigate();
    const [, setTableData] = useAtom(universalTable);
    const companies = useAtomValue(companiesAtom);

    useEffect(() => {
        setTableData({
            header: {
                content: ['Companies', 'Hiring campaigns count'],
            },
            body: {
                content: companies.map((company) => [
                    company.displayName,
                    company.tables.length.toString(),
                ]),
                options: {
                    onClick: (e, index) => {
                        navigate(
                            HIRING_CAMPAIGNS_URL(
                                companies[index === undefined ? 0 : index]
                                    .displayName
                            )
                        );
                    },
                    className: 'hover:bg-gray-800',
                },
            },
        });
    }, []);

    return <DecorativePageContent PageName="Companies" />;
};

export default CompaniesPage;
