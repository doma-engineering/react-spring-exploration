export enum TaskCategories {
    Java = 'Java',
    TypeScript = 'TypeScript',
    Haskell = 'Haskell',
    Elixir = 'Elixir',
    bespoke = 'Bespoke',
    notSelected = '',
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export enum UserStatus {
    NotSelected = '',
    FindNewJob = 'Want to find new job',
    TestSelfSkills = 'Only test self skills',
    TryChangeJob = 'Have job, but want to change job',
    HaveJob = 'Already have a job',
}

export const userStatusSortingWeight = new Map<UserStatus, number>([
    [UserStatus.NotSelected, 0],
    [UserStatus.HaveJob, 1],
    [UserStatus.TestSelfSkills, 2],
    [UserStatus.TryChangeJob, 3],
    [UserStatus.FindNewJob, 4],
]);

export enum Rank {
    NM = 'N/m',
    Senior = 'Senior',
    Middle = 'Middle',
    Junior = 'Junior',
}

export enum TaskTiers {
    base = 'main',
    new = 'newest',
    bespoke = 'bespoke',
}

export type Company = {
    id: string;
    displayName: string;
    tables: string[];
};

export type User = {
    id: number;
    hash: string;

    nick?: string;
    avatarImage?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    gender: Gender;
    birthday: Date;
    country?: string;
    address?: string;
    phoneNumber?: string;
    languages?: string[];
    programLanguages?: string[];
    status: UserStatus;

    taskInProgress?: string[];
    taskCompleted?: string[];
    taskNotFinished?: string[];
};

export type Candidate = {
    hash: string;
    score: number;
    scorePercent: number;
    rank: Rank;
    taskStartDate: Date;
    taskEndDate: Date;
    userStatus: UserStatus;
};

export type CandidateTable = {
    id: string;
    category: TaskCategories;
    tier: TaskTiers;
    displayName: string;
    table: Candidate[];
};

export type CandidateTableFilters = {
    tableID: string;
    tableFilters: boolean[];
};

export type CandidateTableSettings = {
    table: string;
    filters: boolean[];
    sorting: SortFunctionAtom;
};

export type CandidateTablesSettings = CandidateTableSettings[];

export type TableResult = {
    tableID: string;
    pending: number;
    filtered: number;
    total: number;
};

export type TablesResult = TableResult[];

export type FilterProperty = {
    id: string;
    displayName: string;
    color: string;
    defaultSelections?: boolean;
};

export enum SortingMode {
    incPassive = '△',
    incActive = '▲',
    decPassive = '▽',
    decActive = '▼',
    undefined = '#',
}

export type SortingFunction = (
    candidate1: Candidate,
    candidate2: Candidate
) => number;

export type SortingTriangle = {
    mode: SortingMode;
};

// string - name of type of sorting function (as 'date' => sortByDate()).
// Triangle characterizes function (down - decreases, up - increases).
export type SortingTriangles = Map<string, SortingTriangle>;

// by default sort function need be decreased (from hight to low values).
export type SortFunctionAtom = { fn: string; isIncrease: boolean };

export const getDefaultValuesSortingTriangles = () =>
    new Map<string, SortingTriangle>([
        ['score', { mode: SortingMode.decPassive }],
        ['date', { mode: SortingMode.decPassive }],
        ['status', { mode: SortingMode.decPassive }],
    ]);
