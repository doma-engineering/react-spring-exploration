import { Link } from 'react-router-dom';
import RegistrationForms from '../Components/Registration/RegistrationForms';
import { LOGIN_URL } from '../routes';

const RegistrationPage = () => {
    return (
        <div className="flex flex-col items-center text-xl text-slate-200">
            <div className="mt-10 text-4xl text-slate-300">
                Create new account and pay
            </div>
            <Link to={LOGIN_URL} className="mt-5 underline text-slate-200/90">
                have registered in Zero HR?
            </Link>
            <div className="mt-10">
                <RegistrationForms />
            </div>
        </div>
    );
};

export default RegistrationPage;
