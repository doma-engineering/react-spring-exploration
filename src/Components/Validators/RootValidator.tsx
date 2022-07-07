import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentPath, loggedInCompany } from '../../Atoms/Login';
import GetStartedPage from '../../Pages/GetStartedPage';
import { GET_STARTED_URL } from '../../routes';

const RootValidator = () => {
    const navigate = useNavigate();

    const [lastOpenedTab] = useAtom(currentPath);
    const [company] = useAtom(loggedInCompany);

    const [returnPage] = useState(<GetStartedPage />);

    useEffect(() => {
        if (company.isLoggedIn) {
            navigate(lastOpenedTab);
            return;
        }
        navigate(GET_STARTED_URL);
    }, []);

    return returnPage;
};

export default RootValidator;
