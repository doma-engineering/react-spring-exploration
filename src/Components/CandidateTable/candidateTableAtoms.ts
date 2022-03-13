import { atom } from "jotai";
import { candidate, rank } from "./candidateTableTypes";
import { fakeCandidatesData, fakeFilterData } from "./fakeData";

export const candidateCount = atom( 4 );
export const candidatesData = atom <candidate[]> ( fakeCandidatesData.slice( 0, 3 ) );
export const filterData = atom <rank[]> ( fakeFilterData );