import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { currentFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";
import { FilterProperty } from "./candidateTableTypes";

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

  const [filterProps] = useAtom(filterData);
  const [isSelected, setSelected] = useAtom(currentFilters);

  const [isActive] = useAtom(ActiveButtons);

  const rankOnClick = (index: number): void => {
    const newSelection = [...isSelected];
    newSelection[index] = !newSelection[index];
    setSelected(newSelection);
  }

  return (
    <div className="flex flex-col items-center px-2 py-1 mx-2 my-2"> {/*can try set to back as card: bg-sky-900 shadow-md rounded-lg*/}
      <div className="text-stone-300 text-lg font-medium flex w-full justify-center mb-3 border-b border-slate-600 pb-2">
        Filter by rank
      </div>
      <div className="flex flex-col w-40">
        {
          filterProps.map(
            (rank, index) =>
            (
              <button
                disabled={!isActive(rank)}
                className={`rounded mx-1 my-1 px-3 py-1 shadow-md bg-${rank.color}
                            text-base text-stone-200 text-thin
                            decoration-2 decoration-sky-800 ${isSelected[index] ? "no-underline" : "line-through"}
                            hover:brightness-110 active:brightness-125 
                            disabled:brightness-100 disabled:bg-gray-700/50 disabled:text-slate-400`}
                key={"FB" + index.toString()}
                onClick={() => rankOnClick(index)}
              // style={{
              //   background: rank.color,
              // }}
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
