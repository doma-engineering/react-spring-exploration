import { useParams } from 'react-router-dom';
import ToLoginButton from '../Components/Login/toLoginButton';

const ErrorPage = () => {
    const { CompanyName } = useParams();
    return (
        <div className="flex justify-center text-slate-200 items-center flex-col text-3xl mt-10 px-4">
            <div>
                Company <b className="">{CompanyName}</b> haven't registered in
                ∅HR
            </div>
            <div className="mt-4 text-lg">
                <ToLoginButton text="Go to login" style="btnAccent py-1 px-8" />
            </div>
        </div>
    );
};

export default ErrorPage;
