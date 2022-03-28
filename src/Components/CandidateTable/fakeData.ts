import { Candidate, CandidateTable, Company, FilterProperty } from "./candidateTableTypes";

// -------- fake tables data --------- //

export const fakeCandidatesDataJava: Candidate[] = [
  {
    name: "Volter",
    nick: "OE",
    score: 60,
    scoreProcent: 58.8,
    taskStartDate: "11.24.2003 12:06",
    taskEndDate: "11.24.2003 15:33",
    rank: "Junior",
  },
  {
    name: "Botton",
    nick: "JC",
    score: -100,
    scoreProcent: 0,
    taskStartDate: "38.17.2003 02:37",
    taskEndDate: "01.19.2003 15:31",
    rank: "N/m",
  },
  {
    name: "Sebastian",
    nick: "AN",
    score: 370,
    scoreProcent: 89.3,
    taskStartDate: "16.23.2004 24:48",
    taskEndDate: "16.23.2004 26:72",
    rank: "Middle",
  },
  {
    name: "Valteri",
    nick: "AL",
    score: 100,
    scoreProcent: 85.4,
    taskStartDate: "29.01.2004 05:04",
    taskEndDate: "29.01.2004 09:50",
    rank: "Middle"
  },
  {
    name: "Pastor",
    nick: "PS",
    score: 16,
    scoreProcent: 47.2,
    taskStartDate: "48.26.2003 14:22",
    taskEndDate: "48.26.2003 15:17",
    rank: "Junior",
  },
  {
    name: "Lewis",
    nick: "SI",
    score: 986,
    scoreProcent: 99.9,
    taskStartDate: "12.34.2003 32:43",
    taskEndDate: "12.34.2003 34:41",
    rank: "Senior",
  },
  {
    name: "Zero",
    nick: "ZE",
    score: 0,
    scoreProcent: 0,
    taskStartDate: "00.00.0000 00:00",
    taskEndDate: "00.00.0000 00:00",
    rank: "N/m"
  },
  {
    name: "George",
    nick: "GG",
    score: 1100,
    scoreProcent: 99.99,
    taskStartDate: "12.04.2005 12:56",
    taskEndDate: "12.04.2005 13:24",
    rank: "Senior"
  },
  {
    name: "Nikita",
    nick: "IK",
    score: 12,
    scoreProcent: 34.5,
    taskStartDate: "02.39.2003 52:34",
    taskEndDate: "03.39.2003 02:11",
    rank: "N/m",
  },
];

export const fakeCandidatesDataHaskell: Candidate[] = [
  {
    name: "Julie",
    nick: "JE",
    score: 64,
    scoreProcent: 58.9,
    taskStartDate: "11.24.2003 12:06",
    taskEndDate: "11.24.2003 15:33",
    rank: "Junior",
  },
  {
    name: "Miriam",
    nick: "MM",
    score: 10,
    scoreProcent: 2,
    taskStartDate: "38.17.2003 02:37",
    taskEndDate: "01.19.2003 15:31",
    rank: "N/m",
  },
  {
    name: "Harris",
    nick: "HS",
    score: 364,
    scoreProcent: 89.2,
    taskStartDate: "16.23.2004 24:48",
    taskEndDate: "16.23.2004 26:72",
    rank: "Middle",
  },
  {
    name: "Dale",
    nick: "DE",
    score: 112,
    scoreProcent: 86.4,
    taskStartDate: "29.01.2004 05:04",
    taskEndDate: "29.01.2004 09:50",
    rank: "Middle"
  },
  {
    name: "Pastor",
    nick: "PS",
    score: 19,
    scoreProcent: 48.2,
    taskStartDate: "48.26.2003 14:22",
    taskEndDate: "48.26.2003 15:17",
    rank: "Junior",
  },
  {
    name: "Lewis",
    nick: "SI",
    score: 866,
    scoreProcent: 99.3,
    taskStartDate: "12.34.2003 32:43",
    taskEndDate: "12.34.2003 34:41",
    rank: "Senior",
  },
];

export const fakeCandidatesDataTypescript: Candidate[] = [

];

export const fakeCandidatesDataPython: Candidate[] = [

];

// -------- fake companies data --------- //

export const fakeCompanyTEAData: Company = {
  id: "Tea",
  displayName: "Tea",
  tables: [
    "Java",
    "Haskell",
  ],
};

export const fakeCompanyWHALEData: Company = {
  id: "WHALE",
  displayName: "WHALE",
  tables: [
    "Typescript",
  ],
};

// -------- compound fake data --------- //

export const fakeTables: CandidateTable[] = [
  {
    id: "Java",
    displayName: "Java",
    table: fakeCandidatesDataJava,
  },
  {
    id: "Haskell",
    displayName: "Haskell",
    table: fakeCandidatesDataHaskell,
  },
  {
    id: "Typescript",
    displayName: "Typescript",
    table: fakeCandidatesDataTypescript,
  },
  {
    id: "Python",
    displayName: "Python",
    table: fakeCandidatesDataPython,
  }
];

export const fakeCompanies: Company[] = [
  fakeCompanyWHALEData,
  fakeCompanyTEAData,
];

export const fakeFilterData: FilterProperty[] = [
  {
    id: "Senior",
    displayName: "Senior",
    color: "#00FF00",
    defaultSelections: true,
  },
  {
    id: "Middle",
    displayName: "Middle",
    color: "#FFFF00",
    defaultSelections: true,
  },
  {
    id: "Junior",
    displayName: "Junior",
    color: "#FF0000",
    defaultSelections: true,
  },
  {
    id: "N/m",
    displayName: "N/m",
    color: "#000000",
    defaultSelections: false,
  }
];

export const defaultFilterParams = fakeFilterData.map((rank) => rank.defaultSelections ?? true);
