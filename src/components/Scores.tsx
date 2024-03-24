import { styled } from 'styled-components';
import { match } from '../types';

const Table = styled.table`
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
`;

const TableColumn = styled.td`
  padding: 5px 10px;
  border: 1px solid #282828;
`;

const TableRow = styled.tr`
  height: 60px;
`;

const PlayerName = styled(TableColumn)`
  background-color: #282828;
  width: 100px;
`;

const RemoveColumn = styled(TableColumn)`
  border: none;
`;

const RemoveButton = styled.button`
  padding: 3px 10px 5px;
  background-color: grey;
  width: 35px;
`;


function Scores({ matches, removeMatch }: { matches: match[], removeMatch: Function } ) {

  if (!matches.length) return null;

  return (
    <>
      <h2>Scores</h2>
      <Table className="scores">
        <tbody>
        {matches.map((match: match, i: number) => {
          return (
            <TableRow key={i}>
              <PlayerName>{match.homeName}</PlayerName>
              <TableColumn>{match.homeScore}</TableColumn>
              <TableColumn>v</TableColumn>
              <TableColumn>{match.awayScore}</TableColumn>
              <PlayerName>{match.awayName}</PlayerName>
              <RemoveColumn><RemoveButton onClick={() => removeMatch(i)}>-</RemoveButton></RemoveColumn>
            </TableRow>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}


export default Scores;