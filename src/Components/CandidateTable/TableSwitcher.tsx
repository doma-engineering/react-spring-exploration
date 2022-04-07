import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, urlFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";
import { candidateStatus, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";

const tableData = atom(
  (get) => get(currentTable).table
    .map(
      (candidate) => {
        const oldF = get(filters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];
        const newF = get(urlFilters).find((filter) => (filter.tableID === get(currentTable).id))?.tableFilters ?? [false, false, false, false];

        const rankIndex = get(filterData)
          .findIndex((rankType) => rankType.id === candidate.rank);

        if (rankIndex === -1)
          throw `error candidate rank. ${candidate.name}:${candidate.rank}`;
        if (oldF[rankIndex] && newF[rankIndex]) {
          return { ...candidate, swithStatus: candidateStatus.inBoth }
        }
        if (oldF[rankIndex])
          return { ...candidate, swithStatus: candidateStatus.removed }
        if (newF[rankIndex])
          return { ...candidate, swithStatus: candidateStatus.added }
      }
    )
    .filter(c => c) // check to not undefined, becouse map before return <undefind> for candidates who isn't in both tables.
)

const CandidateTableSwitcher = () => {

  const [filter] = useAtom(filterData);
  const [selectedVersion, setSelectedVersion] = useAtom(switcherSelectedTable);
  const [mouseHoverVersion, setMouseHoverVersion] = useAtom(switcherMouseHoverTable);
  const [data] = useAtom(tableData);

  const rankColor = (rankName: string): string => {
    const rank = filter.find(rank => (rank.id === rankName));
    return rank === undefined ? "FFFFFF" : rank.color;
  }

  const findBackground = (status: candidateStatus) => {
    if (status === candidateStatus.added) return "#DDFFDD"
    if (status === candidateStatus.inBoth) return "#DDDDDD"
    if (status === candidateStatus.removed) return "#FFDDDD"
    return "#FF0000" //error
  }

  return (
    <div className='CandidateTable'>
      <div>
        {selectedVersion} : {mouseHoverVersion}
      </div>
      {
        data.map((candidate) => (
          <div
            className="CandidateBox"
            style={{
              borderLeftColor: rankColor(candidate?.rank ?? ""),
              background: findBackground(candidate?.swithStatus ?? candidateStatus.removed),
              borderLeftWidth: "0.4rem"
            }}
          >
            {candidate?.nick}: {candidate?.score}
          </div>
        ))
      }
    </div>
  )
}

export default CandidateTableSwitcher;