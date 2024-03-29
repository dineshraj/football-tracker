import { useState } from 'react';
import MatchInput from './MatchInput';
import Table from './Table';
import Scores from './Scores';
import { Match } from '../types'


function Game({ names }: {names: string[]}) {
  const [matches, setMatch] = useState<Match[]>([]);

  const onSubmit = ({ homeName, homeScore, awayScore, awayName}: Match) => {
    setMatch([
      ...matches,
      {
        homeName, 
        homeScore,
        awayScore,
        awayName
      }
    ]);
  };

  const removeMatch = (indexToRemove: number) => {
    setMatch((previousMatches) => {
      const updatedItems = previousMatches.filter((_, index) => index !== indexToRemove);
      return updatedItems;
    });
  }

  let style;

  if (!matches.length) {
    style = {
      display: 'flex',
      placeItems: 'center',
      height: '100vh',
      justifyContent: 'space-evenly'
    };
  }

  return (
    <>
      <MatchInput names={names} onSubmit={onSubmit} style={style}/>
      <Table matches={matches} />
      <Scores matches={matches} removeMatch={removeMatch} />
    </>
  )
}

export default Game;