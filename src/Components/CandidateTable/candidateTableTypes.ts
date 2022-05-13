
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum UserStatus {
  NotSelected = "",
  FindNewJob = "Want to find new job",
  TestSelfSkills = "Only test self skils",
  TryChangeJob = "Have job, but want to change job",
  HaveJob = "Already have a job"
}

export enum Rank {
  NM = "N/m",
  Senior = "Senior",
  Middle = "Middle",
  Junior = "Junior",
}

export type Company = {
  id: string,
  displayName: string,
  tables: string[],
};

export type User = {
  id: number,
  hashName: string,

  nick?: string,
  avatarImage?: string,
  firstName: string,
  lastName: string,
  emailAdress: string,
  gender: Gender,
  birthday: string,
  country: string,
  adress?: string,
  phoneNumber?: string,
  languages: string[],
  programLanguages?: string[],
  status: UserStatus,

  taskInProgress?: string[],
  taskComplited?: string[],
  taskNotFinished?: string[],
}


export type Candidate = {
  userID: number,
  hashName: string,
  score: number,
  scoreProcent: number,
  rank: Rank,
  taskStartDate: string,
  taskEndDate: string,
  userLocation: string,
  userLanguages: string[],
  userStatus: UserStatus,
};

export type CandidateTable = {
  id: string,
  displayName: string,
  table: Candidate[],
}

export type CandidateTableFilters = {
  tableID: string;
  tableFilters: boolean[];
}

export type TableResult = {
  tableID: string,
  pending: number,
  filtred: number,
  total: number,
};

export type TablesResult = TableResult[];

export type FilterProperty = {
  id: string,
  displayName: string,
  color: string,
  defaultSelections?: boolean,
};