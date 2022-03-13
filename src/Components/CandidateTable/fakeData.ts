import { candidate, rank } from "./candidateTableTypes";

export const fakeCandidatesData: candidate[] = [
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

export const fakeFilterData: rank[] = [
  {
    name: "Senior",
    valueFrom: 500,
    color: "#00FF00",
    isSelected: true,
  },
  {
    name: "Middle",
    valueFrom: 100,
    valueTo: 499,
    color: "#FFFF00",
    isSelected: true,
  },
  {
    name: "Junior",
    valueFrom: 15,
    valueTo: 99,
    color: "#FF0000",
    isSelected: true,
  },
  {
    name: "N/m",
    valueTo: 14,
    color: "#000000",
    isSelected: false,
  }
]