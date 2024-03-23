import React from "react";
import { useEffect, useState } from "react";

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
      setError('The players cannot be the same');
    } else if (homeScore === '' || awayScore === '') {
      setError('Fill in both scores');
    } else {
      setError('');
      onSubmit({ homeName, homeScore, awayScore, awayName });
    }
  };

  return (
    <>
      <p className="error">{error}</p>
      <form>
        <select name="homeName" id="homeName" value={homeName} onChange={({ target }) => setHomeName(target.value)}>
          {names.map((name: string, i: number) => <option key={i} value={name}>{name}</option>)}
        </select>
        <input id="homeScore" className="score"  onChange={({ target }) => setHomeScore(target.value)} /> 
        vs
        <input id="awayScore" className="score" onChange={({ target }) => setAwayScore(target.value)} />
        <select name="awayName" id="awayName" value={awayName} onChange={({ target }) => setAwayName(target.value)}>
          {names.map((name: string, i: number) => <option key={i} value={name}>{name}</option>)}
        </select>
        <button onClick={handleSubmit}>+</button>
      </form>
    </>
  );
}

export default MatchInput;