import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, urlFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";
import { candidateStatus, selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";

const tableData = atom(
  (get) => get(currentTable).table
    .map(
      (candidate) => {
        const oldF = get(filters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];
        const newF = get(urlFilters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];

        const rankIndex = get(filterData).findIndex((rank) => rank.id === candidate.rank);

        if (oldF[rankIndex] && newF[rankIndex]) {
          return { ...candidate, switchStatus: candidateStatus.inBoth }
        }
        if (oldF[rankIndex])
          return { ...candidate, switchStatus: candidateStatus.removed }
        if (newF[rankIndex])
          return { ...candidate, switchStatus: candidateStatus.added }
      }
    )
    .filter(c => c) // check to not undefined, becouse map before return <undefind> for candidates who isn't in both tables.
)

const CandidateTableSwitcher = () => {

  const [filter] = useAtom(filterData);
  const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);
  const [data] = useAtom(tableData);

  const rankColor = (rankName: string): string => {
    const rank = filter.find(rank => (rank.id === rankName));
    return rank === undefined ? "FFFFFF" : rank.color;
  }

  const findBackground = (candidate: candidateStatus, selection: selectedType) => {
    if (selection === selectedType.none) {
      return (candidate === candidateStatus.inBoth) ? "#CCCCCC" : "#EEEEEE";
    }
    if (selection === selectedType.new) {
      return candidate !== candidateStatus.removed ? "#DDFFDD" : "#EEEEEE";
    }
    if (selection === selectedType.old) {
      return (candidate !== candidateStatus.added) ? "#DDFFDD" : "#EEEEEE";
    }
    return "#FF0000" // error 
  }

  const findTextColor = (candidate: candidateStatus) => {
    if (candidate === candidateStatus.inBoth) return "#777777";
    if (candidate === candidateStatus.added) return "#33AA33";
    if (candidate === candidateStatus.removed) return "#990000";
    return "#FF0000" // error
  }

  return (
    <div className='CandidateTable'>
      {
        data.map((candidate) => (
          <div
            className="CandidateBox"
            style={{
              borderLeftColor: rankColor(candidate?.rank ?? ""),
              background: findBackground(candidate?.switchStatus ?? candidateStatus.removed, mouseHoverVersion),
              textDecoration: candidate?.switchStatus === candidateStatus.removed ? "line-through" : "none",
              color: findTextColor(candidate?.switchStatus ?? candidateStatus.removed),
              borderLeftWidth: "0.4rem"
            }}
          >
            {candidate?.hash}: {candidate?.score}
          </div>
        ))
      }
    </div >
  )
}

export default CandidateTableSwitcher;