import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm1 from './RegistrationForm1';
import RegistrationForm2 from './RegistrationForm2';
import RegistrationForm3 from './RegistrationForm3';
import {
    PayMethod,
    RegistrationForm1Data,
    RegistrationForm2Data,
} from './registrationFormsTypes';

const RegistrationForms = () => {
    const navigate = useNavigate();
    const [pressedNextForm1, setPressedNextForm1] = useState(false);
    const [finishedRegistration, whenRegistrationPassed] = useState(false);
    const [pressedForm2Back, setPressedForm2Back] = useState(false);
    const [currentRegistrationForm, setCurrentRegistrationForm] = useState(
        <></>
    );
    const [form1Data, setForm1Data] = useState<RegistrationForm1Data>({
        card: '',
        company: '',
        payMethod: PayMethod.none,
    });
    const [form2Data, setForm2Data] = useState<RegistrationForm2Data>({
        email: '',
        password: '',
    });

    useEffect(() => {
        setCurrentRegistrationForm(
            <RegistrationForm1
                nextPassed={setPressedNextForm1}
                returnData={setForm1Data}
            />
        );
    }, []);

    useEffect(() => {
        if (pressedNextForm1) {
            setCurrentRegistrationForm(
                <RegistrationForm2
                    finishedPassed={whenRegistrationPassed}
                    backPressed={setPressedForm2Back}
                    returnData={setForm2Data}
                    initialValue={form2Data}
                />
            );
            setPressedNextForm1(false);
        }
    }, [pressedNextForm1]);

    useEffect(() => {
        if (pressedForm2Back) {
            setCurrentRegistrationForm(
                <RegistrationForm1
                    nextPassed={setPressedNextForm1}
                    returnData={setForm1Data}
                    initialValue={form1Data}
                />
            );
            setPressedForm2Back(false);
        }
    }, [pressedForm2Back]);

    useEffect(() => {
        if (finishedRegistration) {
            setCurrentRegistrationForm(
                <RegistrationForm3
                    registrationData={{ ...form1Data, ...form2Data }}
                />
            );
            whenRegistrationPassed(false);
        }
    }, [finishedRegistration]);

    return currentRegistrationForm;
};
export default RegistrationForms;
