import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import { TERMS_AND_CONDITIONS } from '../../routes';
import { RegistrationForm2Data } from './registrationFormsTypes';

const RegistrationForm2 = ({
    finishedPassed,
    backPressed,
    initialValue,
    returnData,
}: {
    finishedPassed: Dispatch<SetStateAction<boolean>>;
    backPressed: Dispatch<SetStateAction<boolean>>;
    initialValue?: RegistrationForm2Data;
    returnData: Dispatch<SetStateAction<RegistrationForm2Data>>;
}) => {
    const [emailPassed, setEmailPassed] = useState(false);
    const [passwordPassed, setPasswordPassed] = useState(false);
    const [passwordConfirmPassed, setPasswordConfirmPassed] = useState(false);
    const [allowedFinish, setAllowedFinish] = useState(false);
    const [pressedButtonFinish, setPressedButtonFinish] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [agreeWithTerms, setAgreeWithTerms] = useState(false);

    const checkEmail = (email: string) => {
        if (
            !email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            setEmailPassed(false);
            return;
        }
        setEmailPassed(true);
    };

    const checkPassword = (password: string) => {
        if (password.length < 8) {
            setPasswordPassed(false);
            return;
        }
        setPasswordPassed(true);
    };

    const checkPasswordConfirm = (password2: string) => {
        if (password !== password2) {
            setPasswordConfirmPassed(false);
            return;
        }
        setPasswordConfirmPassed(true);
    };

    const handleWriteEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        checkEmail(e.target.value);
    };

    const handleWritePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        checkPassword(e.target.value);
    };

    const handleWritePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
        checkPasswordConfirm(e.target.value);
    };

    const handleClickTermsCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        setAgreeWithTerms(e.target.checked);
    };

    const handleClickTermsLabel = () => {
        setAgreeWithTerms(!agreeWithTerms);
    };

    const handleClickBack = () => {
        returnData({ email: email, password: password });
        backPressed(true);
    };

    const handleClickFinish = () => {
        setPressedButtonFinish(true);
        if (allowedFinish) {
            returnData({ email: email, password: password });
            finishedPassed(true);
        }
    };

    useEffect(() => {
        if (initialValue) {
            setEmail(initialValue.email);
            setPassword(initialValue.password);

            checkEmail(initialValue.email);
            checkPassword(initialValue.password);
        }
    }, []);

    useEffect(() => {
        if (
            !(
                emailPassed &&
                passwordPassed &&
                passwordConfirmPassed &&
                agreeWithTerms
            )
        ) {
            setAllowedFinish(false);
            return;
        }
        setAllowedFinish(true);
    }, [emailPassed, passwordPassed, passwordConfirmPassed, agreeWithTerms]);

    return (
        <div
            className="flex flex-col 
                       space-y-4 text-sm m-2  
                       lg:text-xl"
        >
            <div className="borderedContainer">
                <label className="mr-3 w-full text-right">Email</label>
                <input
                    type={'email'}
                    placeholder="example@example.com"
                    defaultValue={email}
                    onChange={handleWriteEmail}
                    className={
                        emailPassed || !pressedButtonFinish
                            ? 'baseTextInput'
                            : 'baseTextInput border-2 border-red-600'
                    }
                />
            </div>
            <div className="borderedContainer">
                <label className="mr-3 w-full text-right">Password</label>
                <input
                    type="password"
                    defaultValue={password}
                    onChange={handleWritePassword}
                    className={
                        passwordPassed || !pressedButtonFinish
                            ? 'baseTextInput'
                            : 'baseTextInput border-2 border-red-600'
                    }
                />
            </div>
            <div className="borderedContainer">
                <label className="mr-3  w-full text-right">
                    Confirm password
                </label>
                <input
                    type={'password'}
                    onChange={handleWritePasswordConfirm}
                    className={
                        passwordConfirmPassed || !pressedButtonFinish
                            ? 'baseTextInput'
                            : 'baseTextInput border-2 border-red-600'
                    }
                />
            </div>
            <div className="flex justify-end">
                <input
                    id="checkbox"
                    type="checkbox"
                    onChange={handleClickTermsCheckbox}
                    checked={agreeWithTerms}
                    className={
                        agreeWithTerms || !pressedButtonFinish
                            ? `checked:bg-green-500
                                 w-5
                                 lg:w-7`
                            : `appearance-none bg-red-500
                               w-5
                               lg:w-7`
                    }
                />
                <label
                    className={
                        agreeWithTerms || !pressedButtonFinish
                            ? 'ml-3'
                            : 'ml-3 underline decoration-2 decoration-red-600'
                    }
                >
                    <span onClick={handleClickTermsLabel}>
                        I agree to these{' '}
                    </span>
                    <Link
                        className="text-blue-600"
                        to={TERMS_AND_CONDITIONS}
                        target="_blank"
                    >
                        Terms and Conditions
                    </Link>
                    .
                </label>
            </div>
            <div className="flex justify-between">
                <button
                    className="btnAccent lg:px-12"
                    onClick={handleClickBack}
                >
                    Back
                </button>
                <button
                    className="btnAccent lg:px-6"
                    onClick={handleClickFinish}
                >
                    Finish registration
                </button>
            </div>
        </div>
    );
};
export default RegistrationForm2;
