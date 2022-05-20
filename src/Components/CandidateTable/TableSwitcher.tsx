import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, urlFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";
import { candidateSwitchStatus, selectedType, switcherMouseHoverTable } from "../../Atoms/SwithersAtoms";

const tableData = atom(
  (get) => get(currentTable).table
    .map(
      (candidate) => {
        const oldF = get(filters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];
        const newF = get(urlFilters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];

        const rankIndex = get(filterData).findIndex((rank) => rank.id === candidate.rank);

        if (oldF[rankIndex] && newF[rankIndex]) {
          return { ...candidate, switchStatus: candidateSwitchStatus.inBoth }
        }
        if (oldF[rankIndex])
          return { ...candidate, switchStatus: candidateSwitchStatus.removed }
        if (newF[rankIndex])
          return { ...candidate, switchStatus: candidateSwitchStatus.added }

        return { ...candidate, switchStatus: candidateSwitchStatus.notDisplayed }
      }
    )
    .filter(c => c.switchStatus !== candidateSwitchStatus.notDisplayed)
)

const CandidateTableSwitcher = () => {

  const [filter] = useAtom(filterData);
  const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);
  const [data] = useAtom(tableData);

  const rankColor = (rankName: string): string => {
    const rank = filter.find(rank => (rank.id === rankName));
    return rank === undefined ? "FFFFFF" : rank.color;
  }

  const findBackground = (candidate: candidateSwitchStatus, selection: selectedType) => {
    if (selection === selectedType.none) {
      return (candidate === candidateSwitchStatus.inBoth) ? "#CCCCCC" : "#EEEEEE";
    }
    if (selection === selectedType.new) {
      return candidate !== candidateSwitchStatus.removed ? "#DDFFDD" : "#EEEEEE";
    }
    if (selection === selectedType.old) {
      return (candidate !== candidateSwitchStatus.added) ? "#DDFFDD" : "#EEEEEE";
    }
    return "#FF0000" // error 
  }

  const findTextColor = (candidate: candidateSwitchStatus) => {
    if (candidate === candidateSwitchStatus.inBoth) return "#777777";
    if (candidate === candidateSwitchStatus.added) return "#33AA33";
    if (candidate === candidateSwitchStatus.removed) return "#990000";
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
              background: findBackground(candidate?.switchStatus ?? candidateSwitchStatus.removed, mouseHoverVersion),
              textDecoration: candidate?.switchStatus === candidateSwitchStatus.removed ? "line-through" : "none",
              color: findTextColor(candidate?.switchStatus ?? candidateSwitchStatus.removed),
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