import { Link } from 'react-router-dom';
import RegistrationForms from '../Components/Registration/RegistrationForms';
import { LOGIN_URL } from '../routes';

const RegistrationPage = () => {
    return (
        <div
            className="flex flex-col items-center text-slate-200
                        px-5 text-xl"
        >
            <div
                className="text-slate-300 text-center
                            mt-2 text-4xl
                            lg:mt-10"
            >
                Create new account and pay
            </div>
            <Link to={LOGIN_URL} className="mt-4 underline text-slate-200/90">
                have registered in Zero HR?
            </Link>
            <div
                className="mt-5 mb-20
                           lg:mt-10"
            >
                <RegistrationForms />
            </div>
        </div>
    );
};

export default RegistrationPage;
