import { useAtom } from 'jotai';
import { companies } from '../../Atoms/LoadData';
import { loggedInCompany } from '../../Atoms/Login';

const DisplayUser = () => {
    const [currentCompany] = useAtom(loggedInCompany);
    const [allCompanies] = useAtom(companies);
    const companyName =
        allCompanies.find((company) => company.id === currentCompany.companyId)
            ?.displayName ?? "[Don't logged in]";
    return (
        <div className="text-gray-100 font-thin">
            Current company logged in as
            <span className="text-white font-bold"> {companyName} </span>
        </div>
    );
};

export default DisplayUser;
