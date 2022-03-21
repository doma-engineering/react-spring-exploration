import { concatFn } from "@react-spring/core/dist/declarations/src/helpers";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { candidateCount, candidatesData } from "../Components/CandidateTable/candidateTableAtoms";
import { fakeCandidatesData } from "../Components/CandidateTable/fakeData";
import { filterLink } from "./CandidatesTable";

const Updater = () => {

  const [filter, setFilter] = useAtom(filterLink);
  const [, setCandidates] = useAtom(candidatesData)
  const [count, setCount] = useAtom(candidateCount);

  const { FilterProps } = useParams();

  const unpack = () => {
    if (FilterProps === undefined)
      return "Filter:FFFF:0".split(":")
    const FilterArray = FilterProps.split(":");
    if (FilterArray.length === 1)
      return "Filter:FFFF:0".split(":");
    if (FilterArray.length === 2)
      return FilterArray.concat(["0"]);
    return FilterArray.slice(1,);
  }

  const filterStrings = unpack();

  const filterSelected = "Filter:" + filterStrings[0];
  const nCount = Number(filterStrings[1]);

  console.log(FilterProps)
  console.log(filterSelected, " === ", filter.substring(1).slice(0, 11));
  console.log(nCount, " === ", count);
  console.log('');

  if (filter.substring(1).slice(0, 11) !== filterSelected) {
    console.log("new Filter!");
    setFilter(filterSelected);
  }
  if (nCount !== count) {
    console.log("new Count!");
    setCount(nCount);
    setCandidates(fakeCandidatesData.slice(0, nCount));
  }

  return (<> </>);
}

export default Updater;