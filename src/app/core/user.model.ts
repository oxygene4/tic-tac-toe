interface IStatistics {
  played: number;
  won: number;
  lost: number;
  drawn: number;
  unfinished: number;
}

export interface IUser {
  email: string;
  name: string;
  userId: string;
  displayName: string;
  statistics: IStatistics;
}
