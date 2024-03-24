import { useEffect, useState } from "react";
import { styled } from 'styled-components';
import { Error } from '../styles';


const Score = styled.input`
  width: 50px;
  margin: 10px;
  text-align: center;
  padding: 14px;
`;



function MatchInput({ names, onSubmit }: {names: string[], onSubmit: Function}) {

  const [homeName, setHomeName] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [awayName, setAwayName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setHomeName((document.querySelector('#homeName') as HTMLInputElement).value);
    setAwayName((document.querySelector('#awayName') as HTMLInputElement).value);
  }, [])

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if (homeName === awayName) {
      setError('The opposing sides cannot be the same');
    } else if (homeScore === '' || awayScore === '') {
      setError('You need to fill in both scores');
    } else {
      setError('');
      onSubmit({ homeName, homeScore, awayScore, awayName });
      setHomeScore('');
      setAwayScore('');
    }
  };

  return (
    <>
     {error && <Error>{error}</Error>}
      <form>
        <select name="homeName" id="homeName" value={homeName} onChange={({ target }) => setHomeName(target.value)}>
          {names.map((name: string, i: number) => <option key={i} value={name}>{name}</option>)}
        </select>
        <Score id="homeScore" value={homeScore} onChange={({ target }) => setHomeScore(target.value)} /> 
        v
        <Score id="awayScore" value={awayScore} onChange={({ target }) => setAwayScore(target.value)} />
        <select name="awayName" id="awayName" value={awayName} onChange={({ target }) => setAwayName(target.value)}>
          {names.map((name: string, i: number) => <option key={i} value={name}>{name}</option>)}
        </select>
        <button onClick={handleSubmit}>+</button>
      </form>
    </>
  );
}

export default MatchInput;