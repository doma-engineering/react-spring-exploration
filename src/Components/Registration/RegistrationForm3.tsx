import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { TaskCategories } from '../../Atoms/candidateTableTypes';
import {
    isOpenNewTaskCreating,
    selectedCategory,
} from '../../Atoms/Categories';
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
    const [, setWillOpenedTaskCreating] = useAtom(isOpenNewTaskCreating);
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
        setWillOpenedTaskCreating(
            selectedTaskCategory === TaskCategories.bespoke
        );
        navigate(TASKS_BY_CATEGORY_URL(selectedTaskCategory ?? ''));
    };
    return (
        <div className="text-md lg:text-2xl">
            <p className="mt-2">Please open your mail for confirm your mail.</p>
            <p className="mt-2">
                If you don't receive mail click button below.
            </p>
            <button
                onClick={() =>
                    alert(
                        "Now there haven't back-end support, and all registration do nothing"
                    )
                }
                className="rounded-md border-4 border-sky-800  
                         hover:bg-gray-700/50
                           text-md ml-4 mt-3 py-2 px-4
                           lg:py-3 lg:px-5 "
            >
                resend mail
            </button>
            <button
                className="rounded-md border-4 border-sky-800  
                         hover:bg-gray-700/50
                           ml-4 mt-3 py-2 px-2 text-md
                           lg:text-2xl lg:py-3 lg:px-5"
                onClick={handleClickDevContinue}
            >
                {'<Developers button> Continue'}
            </button>
        </div>
    );
};
export default RegistrationForm3;
