import { match } from '../types';

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

  return (
    <table>
      <tbody>
        <tr>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Goal Difference</th>
          <th>Points</th>
        </tr>
        {table.map((row, i) => {
          console.log('row', row);
          return (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1].played}</td>
              <td>{row[1].won}</td>
              <td>{row[1].drawn}</td>
              <td>{row[1].lost}</td>
              <td>{row[1].goalsFor}</td>
              <td>{row[1].goalsAgainst}</td>
              <td>{row[1].goalDifference}</td>
              <td>{row[1].points}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );

}

export default Table;