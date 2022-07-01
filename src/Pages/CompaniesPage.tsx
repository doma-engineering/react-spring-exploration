import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { decorativeTable } from '../Atoms/DecorativeTable';
import { companies as companiesAtom } from '../Atoms/LoadData';
import DecorativePageContent from '../Components/DecorativePageElements/DecorativePageContent';

const CompaniesPage = () => {
    const [, setTableData] = useAtom(decorativeTable);
    const companies = useAtomValue(companiesAtom);

    useEffect(() => {
        setTableData([
            ['Companies', 'Hiring campaigns count'],
            ...companies.map((company) => [
                company.displayName,
                company.tables.length.toString(),
            ]),
        ]);
    }, []);

    return <DecorativePageContent PageName="Companies" />;
};

export default CompaniesPage;
