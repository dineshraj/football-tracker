export interface Match {
  homeName: string;
  homeScore: string;
  awayScore: string;
  awayName: string;
}

export interface TableRow {
  team?: string;
  played: number;
  won: number; 
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}