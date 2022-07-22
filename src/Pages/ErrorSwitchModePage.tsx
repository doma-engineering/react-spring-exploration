import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { loggedInCompany } from '../Atoms/Login';
import ButtonBackToHiringCampaigns from '../Components/HiringCampaign/ButtonBackToHiringCampaigns';
import { LOGIN_URL } from '../routes';

const ErrorSwitchModePage = () => {
    const navigate = useNavigate();

    const [company] = useAtom(loggedInCompany);

    return (
        <div className="flex flex-col justify-center items-center text-stone-200 text-4xl px-4">
            <span className="mt-10">
                {' '}
                Sorry but you can't go to <b>switch mode</b> without changes.{' '}
            </span>
            {company.isLoggedIn ? (
                <div>
                    <div className="mt-8 text-xl">
                        <ButtonBackToHiringCampaigns />
                    </div>
                </div>
            ) : (
                <button
                    className="btnAccent mt-8 px-9 py-3 text-xl"
                    onClick={() => {
                        navigate(LOGIN_URL);
                    }}
                >
                    to Login
                </button>
            )}
        </div>
    );
};

export default ErrorSwitchModePage;
