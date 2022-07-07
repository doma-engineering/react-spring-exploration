import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { selectedCategory } from '../../Atoms/Categories';
import { companies as companiesAtom } from '../../Atoms/LoadData';
import { loggedInCompany } from '../../Atoms/Login';
import { TASKS_BY_CATEGORY_URL } from '../../routes';
import { RegistrationData } from './registrationFormsTypes';

const RegistrationForm3 = ({
    registrationData,
}: {
    registrationData: RegistrationData;
}) => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useAtom(companiesAtom);
    const [, setLoggedIn] = useAtom(loggedInCompany);
    const selectedTaskCategory = useAtomValue(selectedCategory);
    const handleClickDevContinue = () => {
        setCompanies([
            ...companies,
            {
                displayName: registrationData.company,
                id: registrationData.company,
                tables: [],
            },
        ]);
        setLoggedIn({ companyId: registrationData.company, isLoggedIn: true });
        navigate(TASKS_BY_CATEGORY_URL(selectedTaskCategory));
    };
    return (
        <div className="text-2xl">
            <p>Please open your mail for confirm your mail</p>
            <p>if you don't receive mail click button below</p>
            <button
                onClick={() =>
                    alert(
                        "Now there haven't back-end support, and all registration do nothing"
                    )
                }
                className="mt-5 rounded-md border-4 border-sky-800 py-3 px-5 hover:bg-gray-700/50"
            >
                resend mail
            </button>
            <button
                className="ml-4 rounded-md border-4 border-sky-800 py-3 px-5 hover:bg-gray-700/50"
                onClick={handleClickDevContinue}
            >
                {'<Developers button> Continue'}
            </button>
        </div>
    );
};
export default RegistrationForm3;
