import { match } from '../types';
import { styled } from 'styled-components';

const GameTable = styled.table`
  border-spacing: 0;
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

function Table({ matches }: { matches: match[] }) {

  const createTable = () => {
    const teamStats = {};

    matches.forEach(match => {
      const homeTeam = match.homeName;
      const awayTeam = match.awayName;
      const homeScore = parseInt(match.homeScore);
      const awayScore = parseInt(match.awayScore);
      
      // Initialize team stats if not already present
      teamStats[homeTeam] = teamStats[homeTeam] || { goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, won: 0, drawn: 0, lost: 0 };
      teamStats[awayTeam] = teamStats[awayTeam] || { goalsFor: 0, goalsAgainst: 0, points: 0, played: 0, won: 0, drawn: 0, lost: 0 };
  
      // Update goals for and against
      teamStats[homeTeam].goalsFor += homeScore;
      teamStats[homeTeam].goalsAgainst += awayScore;
      teamStats[awayTeam].goalsFor += awayScore;
      teamStats[awayTeam].goalsAgainst += homeScore;
  
      // Update points and matches played
      if (homeScore > awayScore) {
          teamStats[homeTeam].points += 3;
          teamStats[homeTeam].won++;
          teamStats[awayTeam].lost++;
      } else if (homeScore < awayScore) {
          teamStats[awayTeam].points += 3;
          teamStats[awayTeam].won++;
          teamStats[homeTeam].lost++;
      } else {
          teamStats[homeTeam].points += 1;
          teamStats[awayTeam].points += 1;
          teamStats[homeTeam].drawn++;
          teamStats[awayTeam].drawn++;
      }
      teamStats[homeTeam].played++;
      teamStats[awayTeam].played++;
    });

    // Calculate goal difference
    Object.values(teamStats).forEach(team => {
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    });

    // Sort teams by points and then goal difference in descending order
    const sortedTeams = Object.entries(teamStats).sort((a, b) => {
      if (a[1].points !== b[1].points) {
          return b[1].points - a[1].points;
      } else {
          return b[1].goalDifference - a[1].goalDifference;
      }
    });

    return sortedTeams;
  };

  const table = createTable();

  if (!table.length) return null;

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
          {table.map((row, i) => {
            return (
              <tr key={i}>
                <GameTableTeam>{row[0]}</GameTableTeam>
                <GameTableColumn>{row[1].played}</GameTableColumn>
                <GameTableColumn>{row[1].won}</GameTableColumn>
                <GameTableColumn>{row[1].drawn}</GameTableColumn>
                <GameTableColumn>{row[1].lost}</GameTableColumn>
                <GameTableColumn>{row[1].goalsFor}</GameTableColumn>
                <GameTableColumn>{row[1].goalsAgainst}</GameTableColumn>
                <GameTableColumn>{row[1].goalDifference}</GameTableColumn>
                <GameTableColumn>{row[1].points}</GameTableColumn>
              </tr>
            )
          })}
        </tbody>
      </GameTable>
    </>
  );

}

export default Table;