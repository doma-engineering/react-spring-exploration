import { Candidate, CandidateTable, Company, FilterProperty, Gender, Rank, User, UserStatus } from "./candidateTableTypes";

// -------- fake tables data --------- //

export const fakeUserData: User[] = [
  {
    id: 1,
    hash: "e0cf413338a0c044f835ac0a0990824eb1b9c204a813dfef411704f4949504cc",

    nick: "CToshi",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Cort",
    lastName: "Tosh",
    emailAdress: "ctosh0@github.com",
    gender: Gender.Male,
    birthday: new Date("October 13, 1956"),
    country: "Canada",
    adress: "Nipawin, 300 9 Ave E",
    phoneNumber: "611-626-5472",
    languages: ["en"],
    programLanguages: ["Java", "Haskell"],
    status: UserStatus.FindNewJob,

    taskInProgress: ["Java"],
    taskComplited: ["Haskell"],
    taskNotFinished: ["Pyton"],
  },
  {
    id: 2,
    hash: "fe646603542f1a01b70692b8c7a666d3d7933bf29ceea4d93b64687ba7170cea",

    nick: "Upoings",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Ruth",
    lastName: "Bach",
    emailAdress: "RuthRBach@jourrapide.com",
    gender: Gender.Female,
    birthday: new Date("September 7, 1989"),
    country: "United States",
    adress: "553 Brown Bear Drive, Ontario, CA 91761",
    phoneNumber: "951-662-4489",
    languages: ["en"],
    programLanguages: ["Typescript", "Java"],
    status: UserStatus.HaveJob,

    taskComplited: ["Typescript", "Java"],
  },
  {
    id: 3,
    hash: "04a5246b7a8d173dceb2e6befd05206f30d80e67aa2ebce0b230b80e7fe05397",

    nick: "Relight",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Janet",
    lastName: "Blocker",
    emailAdress: "JanetGBlocker@dayrep.com",
    gender: Gender.Female,
    birthday: new Date("April 26, 1992"),
    country: "United States",
    adress: "Lubbock",
    phoneNumber: "806-833-3131",
    languages: ["en", "es"],
    status: UserStatus.NotSelected,

    taskComplited: ["Java", "Typescript", "Python"],
    taskNotFinished: ["Haskell"],
  },
  {
    id: 4,
    hash: "76f802f8148cfc690156d77a73a79c97f99ba80aa5463f07139d5ea6e37e16d6",

    nick: "Samemaidese",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Ruth",
    lastName: "Artamonova",
    emailAdress: "RuthArtamonova@teleworm.us",
    gender: Gender.Other,
    birthday: new Date("June 21, 1969"),
    country: "Germany",
    adress: "Gotzkowskystrasse 79, 72147 Nehren",
    phoneNumber: "02673 34 15 98",
    languages: ["de", "en"],
    programLanguages: ["Typescript"],
    status: UserStatus.FindNewJob,

    taskInProgress: ["Python"],
    taskComplited: ["Typescript"],
  },
  {
    id: 5,
    hash: "22cd68a40b5087574692699a746d159a6f0cc1986da22a91277b1708fbc1b464",

    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Monika",
    lastName: "Theiss",
    emailAdress: "MonikaTheiss@jourrapide.com",
    gender: Gender.Female,
    birthday: new Date("May 28, 1982"),
    country: "Germany",
    adress: "Esplanade 22, 93356 Teugn",
    phoneNumber: "09405 74 60 60",
    languages: ["de"],
    status: UserStatus.TestSelfSkills,

    taskComplited: ["Typescript", "Java"],
  },
  {
    id: 6,
    hash: "d3f2ad3c7197ab0ce874e11c37d8f2c0e61f9ed5d9b776aa7ef41df3e21b0e2d",

    nick: "Learaw",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Gringamor",
    lastName: "Gawkroger",
    emailAdress: "GringamorGawkroger@jourrapide.com",
    gender: Gender.Male,
    birthday: new Date("October 31, 1960"),
    country: "Germany",
    adress: "Alter Wall 38, 97804 Lohr",
    phoneNumber: "09352 38 11 66",
    languages: ["fo", "en"],
    programLanguages: ["Typescript", "Java", "Python", "Haskell"],
    status: UserStatus.TryChangeJob,

    taskInProgress: ["Python"],
    taskComplited: ["Typescript", "Haskell"],
  },
  {
    id: 7,
    hash: "2bdf1c7a4db5d10c20b7d28d01765476bbe286d9fb90a270f187c0715c593eef",

    nick: "Yestand",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Krystian",
    lastName: "Walczak",
    emailAdress: "KrystianWalczak@armyspy.com",
    gender: Gender.Male,
    birthday: new Date("September 24, 1985"),
    country: "Sweden",
    adress: "Alingsåsvägen 50, 513 00  FRISTAD",
    phoneNumber: "033-8847946",
    languages: ["swe"],
    programLanguages: ["Typescript"],
    status: UserStatus.TryChangeJob,

    taskComplited: ["Typescript"],
  },
  {
    id: 8,
    hash: "2a581cfbb84f8c8d68a6b0674a3c032bdff78b79d1218afba53bb1df18e44d93",

    nick: "Clor1993",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Bogumił",
    lastName: "Kwiatkowski",
    emailAdress: "BogumilKwiatkowski@jourrapide.com",
    gender: Gender.Male,
    birthday: new Date("October 4, 1993"),
    country: "Sweden",
    phoneNumber: "0321-7486820",
    languages: ["en"],
    status: UserStatus.FindNewJob,

    taskComplited: ["Typescript"],
    taskNotFinished: ["Python"],
  },
  {
    id: 9,
    hash: "63c2be5be58972d6acf6c03e4a7d0c6ec8b68b42b548e378c6d8a57ed8fe9c3f",

    nick: "Wareatur",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Ioannis",
    lastName: "Scholte",
    emailAdress: "IoannisScholte@armyspy.com",
    gender: Gender.Male,
    birthday: new Date("June 29, 2006"),
    country: "Iceland",
    adress: "Hverfisgata 53, 801 Selfoss",
    phoneNumber: "489 7002",
    languages: ["en"],
    programLanguages: ["Java"],
    status: UserStatus.FindNewJob,

    taskComplited: ["Java", "Typescript"],
    taskNotFinished: ["Haskell"],
  },
  {
    id: 10,
    hash: "3ff6d51a706a176cd3504635462e655d84cb12321d03b3a0a4f184c4245fe89a",

    nick: "Likence",
    avatarImage: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    firstName: "Bertoldo",
    lastName: "Vela Matías",
    emailAdress: "BertoldoVelaMatias@teleworm.us",
    gender: Gender.Male,
    birthday: new Date("April 21, 1977"),
    country: "Italy",
    adress: "Via Silvio Spaventa, 72, 06040-Sant'Angelo In Mercole PG",
    phoneNumber: "0317 5454267",
    languages: ["it", "en", "eu"],
    programLanguages: ["Haskell", "Typescript"],
    status: UserStatus.TryChangeJob,

    taskInProgress: ["Java"],
    taskComplited: ["Haskell", "Python"],
    taskNotFinished: ["Typescript"],
  },
]

//
//  Java
//

export const fakeCandidatesDataJava: Candidate[] = [
  {
    hash: "fe646603542f1a01b70692b8c7a666d3d7933bf29ceea4d93b64687ba7170cea",
    score: 72,
    scorePercent: 10.8,
    rank: Rank.Junior,
    taskStartDate: new Date("2022-08-26 14:40"),
    taskEndDate: new Date("2022-08-26 15:33"),
    userStatus: UserStatus.HaveJob,
  },
  {
    hash: "04a5246b7a8d173dceb2e6befd05206f30d80e67aa2ebce0b230b80e7fe05397",
    score: 635,
    scorePercent: 95.3,
    rank: Rank.Senior,
    taskStartDate: new Date("2022-08-31 10:59"),
    taskEndDate: new Date("2022-08-31 14:02"),
    userStatus: UserStatus.NotSelected,
  },
  {
    hash: "22cd68a40b5087574692699a746d159a6f0cc1986da22a91277b1708fbc1b464",
    score: 438,
    scorePercent: 65.7,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-07-04 14:56"),
    taskEndDate: new Date("2022-07-04 16:23"),
    userStatus: UserStatus.TestSelfSkills,
  },
  {
    hash: "63c2be5be58972d6acf6c03e4a7d0c6ec8b68b42b548e378c6d8a57ed8fe9c3f",
    score: 461,
    scorePercent: 69.2,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-06-06 15:30"),
    taskEndDate: new Date("2022-06-06 17:21"),
    userStatus: UserStatus.FindNewJob,
  },
];

//
//  Haskell
//

export const fakeCandidatesDataHaskell: Candidate[] = [
  {
    hash: "e0cf413338a0c044f835ac0a0990824eb1b9c204a813dfef411704f4949504cc",
    score: 344,
    scorePercent: 51.6,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-05-13 15:30"),
    taskEndDate: new Date("2022-05-13 16:40"),
    userStatus: UserStatus.FindNewJob,
  },
  {
    hash: "d3f2ad3c7197ab0ce874e11c37d8f2c0e61f9ed5d9b776aa7ef41df3e21b0e2d",
    score: -32,
    scorePercent: 0,
    rank: Rank.NM,
    taskStartDate: new Date("2022-12-09 05:23"),
    taskEndDate: new Date("2022-12-09 08:12"),
    userStatus: UserStatus.TryChangeJob,
  },
  {
    hash: "3ff6d51a706a176cd3504635462e655d84cb12321d03b3a0a4f184c4245fe89a",
    score: 72,
    scorePercent: 10.8,
    rank: Rank.Junior,
    taskStartDate: new Date("2022-08-04 15:15"),
    taskEndDate: new Date("2022-08-04 15:56"),
    userStatus: UserStatus.TryChangeJob,
  },
];

//
//  Typescript
//

export const fakeCandidatesDataTypescript: Candidate[] = [
  {
    hash: "fe646603542f1a01b70692b8c7a666d3d7933bf29ceea4d93b64687ba7170cea",
    score: 476,
    scorePercent: 71.4,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-08-11 12:12"),
    taskEndDate: new Date("2022-08-11 12:50"),
    userStatus: UserStatus.HaveJob,
  },
  {
    hash: "04a5246b7a8d173dceb2e6befd05206f30d80e67aa2ebce0b230b80e7fe05397",
    score: 168,
    scorePercent: 25.2,
    rank: Rank.Junior,
    taskStartDate: new Date("2022-10-24 18:30"),
    taskEndDate: new Date("2022-10-24 19:40"),
    userStatus: UserStatus.NotSelected,
  },
  {
    hash: "76f802f8148cfc690156d77a73a79c97f99ba80aa5463f07139d5ea6e37e16d6",
    score: 313,
    scorePercent: 46.9,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-06-29 8:00"),
    taskEndDate: new Date("2022-06-29 11:16"),
    userStatus: UserStatus.FindNewJob,
  },
  {
    hash: "22cd68a40b5087574692699a746d159a6f0cc1986da22a91277b1708fbc1b464",
    score: 284,
    scorePercent: 62.6,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-11-03 11:22"),
    taskEndDate: new Date("2022-11-03 13:23"),
    userStatus: UserStatus.TestSelfSkills,
  },
  {
    hash: "d3f2ad3c7197ab0ce874e11c37d8f2c0e61f9ed5d9b776aa7ef41df3e21b0e2d",
    score: 306,
    scorePercent: 45.9,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-12-02 03:11"),
    taskEndDate: new Date("2022-12-02 04:36"),
    userStatus: UserStatus.TryChangeJob,
  },
  {
    hash: "2bdf1c7a4db5d10c20b7d28d01765476bbe286d9fb90a270f187c0715c593eef",
    score: 196,
    scorePercent: 29.4,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-05-25 19:12"),
    taskEndDate: new Date("2022-05-25 21:32"),
    userStatus: UserStatus.TryChangeJob,
  },
  {
    hash: "2a581cfbb84f8c8d68a6b0674a3c032bdff78b79d1218afba53bb1df18e44d93",
    score: 389,
    scorePercent: 58.4,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-08-01 19:50"),
    taskEndDate: new Date("2022-08-01 22:12"),
    userStatus: UserStatus.FindNewJob,
  },
  {
    hash: "63c2be5be58972d6acf6c03e4a7d0c6ec8b68b42b548e378c6d8a57ed8fe9c3f",
    score: 503,
    scorePercent: 75.5,
    rank: Rank.Senior,
    taskStartDate: new Date("2022-07-20 13:12"),
    taskEndDate: new Date("2022-07-20 13:41"),
    userStatus: UserStatus.FindNewJob,
  },
];

//
//  Python
//

export const fakeCandidatesDataPython: Candidate[] = [
  {
    hash: "04a5246b7a8d173dceb2e6befd05206f30d80e67aa2ebce0b230b80e7fe05397",
    score: -22,
    scorePercent: 0,
    rank: Rank.NM,
    taskStartDate: new Date("2022-12-14 14:21"),
    taskEndDate: new Date("2022-12-14 15:13"),
    userStatus: UserStatus.NotSelected,
  },
  {
    hash: "3ff6d51a706a176cd3504635462e655d84cb12321d03b3a0a4f184c4245fe89a",
    score: 448,
    scorePercent: 67.2,
    rank: Rank.Middle,
    taskStartDate: new Date("2022-08-12 16:42"),
    taskEndDate: new Date("2022-08-12 17:44"),
    userStatus: UserStatus.TryChangeJob,
  },
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
    "Typescript", "Java", "Python",
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

export const defaultFilterParams = fakeFilterData.map((rank) => rank.defaultSelections ?? true);
