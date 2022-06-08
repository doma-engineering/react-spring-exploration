import { FilterProperty, Rank } from "../../Atoms/candidateTableTypes";

export const filterData: FilterProperty[] = [
  {
    id: Rank.Senior,
    displayName: "Senior",
    color: "Senior",
    defaultSelections: true,
  },
  {
    id: Rank.Middle,
    displayName: "Middle",
    color: "Middle",
    defaultSelections: true,
  },
  {
    id: Rank.Junior,
    displayName: "Junior",
    color: "Junior",
    defaultSelections: true,
  },
  {
    id: Rank.NM,
    displayName: "N/m",
    color: "NM",
    defaultSelections: false,
  }
];