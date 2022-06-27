import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { loggedInCompany } from '../../Atoms/Login';
import { LOGIN_URL } from '../../routes';

type buttonParameters = {
    text: string;
    style: string;
};

const ToLoginButton: React.FC<buttonParameters> = ({ text, style }) => {
    const navigate = useNavigate();
    const [, setLoggedInCompany] = useAtom(loggedInCompany);

    const handleClick = () => {
        navigate(LOGIN_URL);
        setLoggedInCompany({ companyId: '', isLoggedIn: false });
    };

    return (
        <button className={style} onClick={handleClick}>
            {text}
        </button>
    );
};

export default ToLoginButton;
