import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import { PayMethod, RegistrationForm1Data } from './registrationFormsTypes';

const RegistrationForm1 = ({
    nextPassed,
    initialValue,
    returnData,
}: {
    nextPassed: Dispatch<SetStateAction<boolean>>;
    initialValue?: RegistrationForm1Data;
    returnData: Dispatch<SetStateAction<RegistrationForm1Data>>;
}) => {
    const [namePassed, setNamePassed] = useState(false);
    const [cardPassed, setCardPassed] = useState(false);
    const [payMethodPassed, setPayMethodPassed] = useState(false);
    const [allowedGoNext, setAllowedNext] = useState(false);
    const [pressedButtonNext, setPressedButtonNext] = useState(false);

    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [selectedPayMethod, setSelectedPayMethod] = useState<PayMethod>(
        PayMethod.none
    );

    const checkName = (name: string) => {
        if (name.length > 0) {
            setNamePassed(true);
            return;
        }
        setNamePassed(false);
    };

    const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        checkName(e.target.value);
    };

    const checkCard = (card: string) => {
        if (!(card.replace(/\d/g, '').replace(/[u-\s]/g, '').length === 0)) {
            setCardPassed(false);
            return;
        }
        if (!(card.replace(/\D/g, '').length === 16)) {
            setCardPassed(false);
            return;
        }
        setCardPassed(true);
    };

    const formatCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value.replace(/ /g, '');
        let inputNumbersOnly = inputVal.replace(/\D/g, '');

        if (inputNumbersOnly.length > 16) {
            inputNumbersOnly = inputNumbersOnly.slice(0, 16);
        }

        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = '';
        if (splits) {
            spacedNumber = splits.join(' ');
        }

        setCard(spacedNumber);
    };

    const handleWriteCard = (e: ChangeEvent<HTMLInputElement>) => {
        setCard(e.target.value);
        checkCard(e.target.value);
        formatCardNumber(e);
    };

    const checkPayMethod = (payMethod: PayMethod) => {
        setPayMethodPassed(false);
        if (payMethod !== PayMethod.none) {
            setPayMethodPassed(true);
        }
    };

    const handleClickPayMethod = (payMethodType: PayMethod) => {
        setSelectedPayMethod(payMethodType);
        setPayMethodPassed(true);
    };

    const handleClickNext = () => {
        setPressedButtonNext(true);
        if (allowedGoNext) {
            returnData({
                company: name,
                card: card,
                payMethod: selectedPayMethod,
            });
            nextPassed(true);
        }
    };

    const tryAlowGoNext = () => {
        setAllowedNext(false);
        if (namePassed && cardPassed && payMethodPassed) {
            setAllowedNext(true);
        }
    };

    useEffect(() => {
        if (initialValue) {
            setName(initialValue.company);
            setCard(initialValue.card);
            setSelectedPayMethod(initialValue.payMethod);

            checkName(initialValue.company);
            checkCard(initialValue.card);
            checkPayMethod(initialValue.payMethod);
        }
    }, []);

    useEffect(() => {
        tryAlowGoNext();
    }, [namePassed, cardPassed, payMethodPassed]);

    return (
        <div
            className="flex flex-col items-center
                        text-sm
                        lg:text-xl"
        >
            <div>
                <input
                    type="text"
                    placeholder="Hint Ltd."
                    defaultValue={name}
                    onChange={handleWriteName}
                    className={
                        namePassed || !pressedButtonNext
                            ? 'longTextInput'
                            : 'longTextInput border-2 border-red-600'
                    }
                />
                <p className="text-sm text-center mb-5">
                    Your company name (as listed in your country's registry)
                </p>
                <input
                    className={
                        cardPassed || !pressedButtonNext
                            ? 'longTextInput'
                            : 'longTextInput border-2 border-red-600'
                    }
                    placeholder="6666 6666 6666 6666"
                    maxLength={19}
                    value={card}
                    onChange={handleWriteCard}
                />
                <p className="text-sm text-center w">
                    Card number of your company
                </p>
            </div>

            <div
                className={`flex flex-col bg-slate-900 rounded-xl p-3
                            mt-5 
                            md:w-3/4
                            lg:w-2/4
                                ${
                                    payMethodPassed || !pressedButtonNext
                                        ? ''
                                        : 'border-2 border-red-600'
                                }`}
            >
                <div>
                    <p className="text-center text-violet-400 font-bold text-2xl">
                        First month free!
                    </p>
                    <p>After:</p>
                    <div>
                        <input
                            type="radio"
                            id="main"
                            name="subscribeType"
                            value="main"
                            onChange={() =>
                                handleClickPayMethod(PayMethod.base)
                            }
                            checked={selectedPayMethod === PayMethod.base}
                        />
                        <label
                            className="p-2"
                            onClick={() => handleClickPayMethod(PayMethod.base)}
                        >
                            135€ per month: main tasks and you vacancy
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="advanced"
                            name="subscribeType"
                            value="advanced"
                            onChange={() =>
                                handleClickPayMethod(PayMethod.advanced)
                            }
                            checked={selectedPayMethod === PayMethod.advanced}
                        />
                        <label
                            className="p-2 "
                            onClick={() =>
                                handleClickPayMethod(PayMethod.advanced)
                            }
                        >
                            1350€ per month: newest task, access to score points
                            in tables priority support and get choice our
                            technology and task developing direction
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="premium"
                            name="subscribeType"
                            value="premium"
                            onChange={() =>
                                handleClickPayMethod(PayMethod.premium)
                            }
                            checked={selectedPayMethod === PayMethod.premium}
                        />
                        <label
                            className="p-2"
                            onClick={() =>
                                handleClickPayMethod(PayMethod.premium)
                            }
                        >
                            Implementation Zhr to your infrastructure. Price for
                            white label individual.
                        </label>
                    </div>
                </div>
            </div>
            <div
                className="flex justify-end
                            w-full
                            lg:w-2/4"
            >
                <button
                    className="btnAccent disabled:bg-slate-700/50"
                    onClick={handleClickNext}
                >
                    Next step
                </button>
            </div>
        </div>
    );
};
export default RegistrationForm1;
