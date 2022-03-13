export type candidate = {
  name: string,
  nick: string,
  score: number,
  scoreProcent: number,
  taskStartDate: string,
  taskEndDate: string,
  rank: string,
};

export type rank = {
  name: string,
  valueFrom?: number,
  valueTo?: number,
  color: string,
  isSelected: boolean,
};
