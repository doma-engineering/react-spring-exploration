import EnterButton from '../Components/Login/EnterButton';
import Login from '../Components/Login/Login';

const LoginPage = () => {
    return (
        <div className="flex justify-center mt-40 space-x-3">
            <Login />
            <EnterButton />
        </div>
    );
};

export default LoginPage;
