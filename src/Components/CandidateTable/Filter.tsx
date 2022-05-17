import { useAtom } from "jotai";
import { currentFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";

const Filter = () => {

  const [filterProps] = useAtom(filterData);
  const [isSelected, setSelected] = useAtom(currentFilters)

  if (isSelected == []) {
    console.log("Warrning!");
  }

  const rankOnClick = (index: number): void => {
    const newSelection = [...isSelected];
    newSelection[index] = !newSelection[index];
    setSelected(newSelection);
  }

  return (
    <div className="Filter">
      {
        filterProps.map(
          (rank, index) =>
          (
            <button
              className="FilterButton"
              key={"FB" + index.toString()}
              onClick={() => rankOnClick(index)}
              style={{
                textDecoration: isSelected[index] ? "none" : "line-through",
                background: rank.color + "AA",
                color: "#000000",

              }}
            >
              {rank.displayName}
            </button>
          )
        )
      }
    </div>
  );
}

export default Filter;
