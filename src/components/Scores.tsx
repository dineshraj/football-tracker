import { styled } from 'styled-components';
import { match } from '../types';

const Table = styled.table`
  width: 50%;
  margin: 0 auto;
  
  margin-top: 20px;
`;

const TableColumn = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const PlayerName = styled(TableColumn)`
  background-color: grey;
`;

const RemoveColumn = styled(TableColumn)`
  border: none;
`;


function Scores({ matches, removeMatch }: { matches: match[], removeMatch: Function } ) {

  if (!matches.length) return null;

  return (
    <Table className="scores">
      <tbody>

      {matches.map((match: match, i: number) => {
        return (
          <tr key={i}>
            <PlayerName>{match.homeName}</PlayerName>
            <TableColumn>{match.homeScore}</TableColumn>
            <TableColumn>v</TableColumn>
            <TableColumn>{match.awayScore}</TableColumn>
            <PlayerName>{match.awayName}</PlayerName>
            <RemoveColumn><button onClick={() => removeMatch(i)}>-</button></RemoveColumn>
          </tr>
          )
        })}
      </tbody>
    </Table>
  );
}


export default Scores;