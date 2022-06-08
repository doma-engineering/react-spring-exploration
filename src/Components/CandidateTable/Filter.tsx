import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { currentFilters } from "../../Atoms/Filters";
import { FilterProperty } from "../../Atoms/candidateTableTypes";
import { filterData } from "./filterData";

const ActiveButtons = atom(
  (get) =>
    (rank: FilterProperty) =>
    (
      get(currentTable).table.findIndex(
        (candidate) => (candidate.rank === rank.id)
      ) !== -1
    ),
)

const Filter = () => {

  const [isSelected, setSelected] = useAtom(currentFilters);

  const [isActive] = useAtom(ActiveButtons);

  const rankOnClick = (index: number): void => {
    const newSelection = [...isSelected];
    newSelection[index] = !newSelection[index];
    setSelected(newSelection);
  }

  return (
    <div className="flex flex-col items-center px-2 py-1 mx-2 my-2">
      <div className="lblFilter">
        Filter by rank
      </div>
      <div className="flex flex-col w-40">
        {
          filterData.map(
            (rank, index) =>
            (
              <button
                disabled={!isActive(rank)}
                className={`btnFilter bg-${rank.color}
                            ${isSelected[index] ? "no-underline" : "line-through"}`}
                key={"FB" + index.toString()}
                onClick={() => rankOnClick(index)}
              >
                {rank.displayName}
              </button>
            )
          )
        }
      </div>
    </div>
  );
}

export default Filter;
