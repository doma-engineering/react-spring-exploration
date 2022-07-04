import { useAtom } from 'jotai';
import { pressedEnterButton } from '../../Atoms/Login';

const EnterButton = () => {
    const [, setButtonPressed] = useAtom(pressedEnterButton);

    const handleClick = () => {
        setButtonPressed(true);
    };

    return (
        <button className="btnAccent py-2 px-9" onClick={handleClick}>
            Enter
        </button>
    );
};

export default EnterButton;
