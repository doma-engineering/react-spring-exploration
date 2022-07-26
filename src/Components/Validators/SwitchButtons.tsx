import { useAtom } from 'jotai';
import {
    selectedType,
    switcherMouseHoverTable,
    switcherSelectedTable,
} from '../../Atoms/SwithersAtoms';

const SwitcherButtons = () => {
    const [, setSelected] = useAtom(switcherSelectedTable);
    const [, setHover] = useAtom(switcherMouseHoverTable);

    const hasClickedOld = () => {
        setSelected(selectedType.old);
    };

    const hasClickedNew = () => {
        setSelected(selectedType.new);
    };

    return (
        <div className="flex justify-center content-center text-slate-300 space-x-4 text-xl">
            <button
                className="px-8 py-3 outline rounded-full outline-red-800 
                 hover:text-slate-200 hover:outline-indigo-500 hover:bg-red-800"
                onMouseEnter={() => setHover(selectedType.old)}
                onMouseLeave={() => setHover(selectedType.none)}
                onClick={hasClickedOld}
            >
                Select Old
            </button>
            <button
                className="px-8 py-3 outline rounded-full outline-green-700 
                 hover:text-slate-200 hover:outline-indigo-500 hover:bg-green-700"
                onMouseEnter={() => setHover(selectedType.new)}
                onMouseLeave={() => setHover(selectedType.none)}
                onClick={hasClickedNew}
            >
                Select New
            </button>
        </div>
    );
};

export default SwitcherButtons;
