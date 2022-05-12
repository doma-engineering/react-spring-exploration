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
    <div
      className="switherButtonsBody"
      style={{
        width: style.width,
        height: style.height,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <button
        onMouseEnter={() => setHover(selectedType.old)}
        onMouseLeave={() => setHover(selectedType.none)}
        onClick={hasClickedOld}
        style={{
          ...style.buttonStyle,
          background: hover === selectedType.old ? "#DDAAAA" : "#EEEEEE"
        }}
      >
        select Old
      </button>
      <button
        onMouseEnter={() => setHover(selectedType.new)}
        onMouseLeave={() => setHover(selectedType.none)}
        onClick={hasClickedNew}
        style={{
          ...style.buttonStyle,
          background: hover === selectedType.new ? "#AADDAA" : "#EEEEEE"
        }}
      >
        select New
      </button>
    </div>
  );
}

export default SwitherButtons;

const style = {
  width: "17rem",
  height: "4rem",
  buttonStyle: {
    width: "8rem",
    height: "2rem",
    margin: "0.5"
  }
}