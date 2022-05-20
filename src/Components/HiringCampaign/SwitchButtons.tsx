import { useAtom } from "jotai";
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";

const SwitherButtons = () => {

  const [, setSelected] = useAtom(switcherSelectedTable);
  const [hover, setHover] = useAtom(switcherMouseHoverTable);

  const hasClickedOld = () => {
    setSelected(selectedType.old);
  }

  const hasClickedNew = () => {
    setSelected(selectedType.new);
  }

  return (
    <div className="flex justify-center content-center text-slate-300 space-x-2">
      <button
        className="px-2 py-1 outline outline-blue-500 rounded-full outline-red-800 hover:text-slate-200 hover:outline-transparent hover:bg-red-800"
        onMouseEnter={() => setHover(selectedType.old)}
        onMouseLeave={() => setHover(selectedType.none)}
        onClick={hasClickedOld}
      >
        select Old
      </button>
      <button
        className="px-2 py-1 outline outline-blue-500 rounded-full outline-green-700 hover:text-slate-200 hover:outline-transparent hover:bg-green-700"
        onMouseEnter={() => setHover(selectedType.new)}
        onMouseLeave={() => setHover(selectedType.none)}
        onClick={hasClickedNew}
      >
        select New
      </button>
    </div>
  );
}

export default SwitherButtons;