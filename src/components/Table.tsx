import { Match, TableRow } from '../types';
import { styled } from 'styled-components';

const GameTable = styled.table`
  border-spacing: 0;
  width: 100%;
`;

const GameTableColumn = styled.td`
  width: 100px;
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid #282828;
`;

const GameTableHeader = styled(GameTableColumn)`
  background-color: black;
`;
const GameTableTeamHeader = styled(GameTableHeader)`
  text-align: left;
`;

const GameTableTeam = styled(GameTableColumn)`
  text-align: left;
  background-color: none;
`;

function Table({ matches }: { matches: Match[] }) {
  const createTable = () => {
    const table: TableRow[] = [];
    const initialValues: TableRow = {
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    }

    const addStats = (homeTeamIndex: number, awayTeamIndex: number,  homeScore: number, awayScore: number) => {
      table[homeTeamIndex].played++;
      table[homeTeamIndex].goalsFor += homeScore;
      table[homeTeamIndex].goalsAgainst += awayScore;
      
      table[awayTeamIndex].played++;
      table[awayTeamIndex].goalsFor += awayScore;
      table[awayTeamIndex].goalsAgainst += homeScore;

      if (homeScore > awayScore) {
        table[homeTeamIndex].points += 3;
        table[homeTeamIndex].won++;
        table[awayTeamIndex].lost++;
      } else if (homeScore < awayScore) {
        table[awayTeamIndex].points += 3;
        table[awayTeamIndex].won++;
        table[homeTeamIndex].lost++;
      } else {
          table[homeTeamIndex].points += 1;
          table[awayTeamIndex].points += 1;
          table[homeTeamIndex].drawn++;
          table[awayTeamIndex].drawn++;
      }
    }

    matches.forEach((match) => {
      const homeTeam: string = match.homeName;
      const awayTeam: string = match.awayName;
      const homeScore: number = parseInt(match.homeScore);
      const awayScore: number = parseInt(match.awayScore);

      let homeTeamIndex = table.findIndex(row => row.team === homeTeam);
      let awayTeamIndex = table.findIndex(row => row.team === awayTeam);

      if (homeTeamIndex < 0) {
        homeTeamIndex = (table.push({ team: homeTeam, ...initialValues }) - 1)
      }
      if (awayTeamIndex < 0) {
        awayTeamIndex = (table.push({ team: awayTeam, ...initialValues }) - 1)
      }
      
      addStats(homeTeamIndex, awayTeamIndex, homeScore, awayScore);
    });    

    // Calculate goal difference
    Object.values(table).forEach((row: TableRow) => {
      row.goalDifference = row.goalsFor - row.goalsAgainst;
    });

    const sortedTable = table.sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      } else {
        return b.goalDifference - a.goalDifference;  
      }
    })
    return sortedTable;
  };

  const currentTable = createTable();

  if (!currentTable.length) return null;

  return (
    <>
      <h2>Table</h2>
      <GameTable>
        <tbody>
          <tr>
            <GameTableTeamHeader>Team</GameTableTeamHeader>
            <GameTableHeader>Played</GameTableHeader>
            <GameTableHeader>Won</GameTableHeader>
            <GameTableHeader>Draw</GameTableHeader>
            <GameTableHeader>Lost</GameTableHeader>
            <GameTableHeader>For</GameTableHeader>
            <GameTableHeader>Against</GameTableHeader>
            <GameTableHeader>GD</GameTableHeader>
            <GameTableHeader>Points</GameTableHeader>
          </tr>
          {currentTable.map((row, i) => {
            return (
              <tr key={i}>
                <GameTableTeam>{row.team}</GameTableTeam>
                <GameTableColumn>{row.played}</GameTableColumn>
                <GameTableColumn>{row.won}</GameTableColumn>
                <GameTableColumn>{row.drawn}</GameTableColumn>
                <GameTableColumn>{row.lost}</GameTableColumn>
                <GameTableColumn>{row.goalsFor}</GameTableColumn>
                <GameTableColumn>{row.goalsAgainst}</GameTableColumn>
                <GameTableColumn>{row.goalDifference}</GameTableColumn>
                <GameTableColumn>{row.points}</GameTableColumn>
              </tr>
            )
          })}
        </tbody>
      </GameTable>
    </>
  );
}

export default Table;