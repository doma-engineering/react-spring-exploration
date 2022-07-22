import EnterButton from '../Components/Login/EnterButton';
import Login from '../Components/Login/Login';

const LoginPage = () => {
    return (
        <div
            className="mt-40 px-4 
                        lg:flex lg:justify-center lg:space-x-3"
        >
            <Login />
            <div className="pt-2">
                <EnterButton />
            </div>
        </div>
    );
};

export default LoginPage;
