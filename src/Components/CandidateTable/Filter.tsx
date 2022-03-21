import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { filterToLinkData } from "../../Pages/CandidatesTable";
import { candidateCount, filterData } from "./candidateTableAtoms";

const Filter = () => {

  const [filter, setFilter] = useAtom(filterData);
  const navigate = useNavigate();
  const [count] = useAtom(candidateCount)

  const rankOnClick = (index: number): void => {
    const newSelect = [...filter];
    newSelect[index].isSelected = !newSelect[index].isSelected;
    setFilter(newSelect);
  }

  return (
    <div className="Filter">
      {
        filter.map(
          (rank, index) =>
          (
            <button
              className="FilterButton"
              key={"FB" + index.toString()}
              onClick={() => { rankOnClick(index); navigate("/CandidateTables/Pyton" + filterToLinkData(filter, count)); }}
              style={{
                textDecoration: rank.isSelected ? "none" : "line-through",
                background: rank.color + "AA",
              }}
            >
              {rank.name}
            </button>
          )
        )
      }
    </div>
  );
}

export default Filter;
