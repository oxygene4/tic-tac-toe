interface IStatistics {
  played: 0;
  won: 0;
  lost: 0;
  drawn: 0;
}

export interface IUser {
  email: string;
  name: string;
  statistics: IStatistics;
}
