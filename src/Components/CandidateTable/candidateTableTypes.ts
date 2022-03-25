export type Company = {
  id: string,
  displayName: string,
  tables: string[],
};

export type Candidate = {
  name: string,
  nick: string,
  score: number,
  scoreProcent: number,
  taskStartDate: string,
  taskEndDate: string,
  rank: string,
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