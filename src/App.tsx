import { useState } from 'react';
import { styled } from 'styled-components';

import './App.css';
import Names from './components/Names';
import Game from './components/Game';


const Title = styled.h1`
  color: #70f079;
  font-family: 'Tahoma';
  letter-spacing: 1px;
  margin-bottom: 70px;
`;

function App() {
  const [component, setComponent] = useState('names')
  const [names, setName] = useState<string[]>([]);

  const handleAddName = (event: React.ChangeEvent<any>, formData: string) => {
    event.preventDefault();
    setName([
        ...names,
        formData
      ]
    );
  }

  const handleOnNext = () => {
    setComponent('games')
  }

  const handleRemoveName = (indexToRemove: number) => {
    setName((previousMatches) => {
      const updatedItems = previousMatches.filter((_, index) => index !== indexToRemove);
      return updatedItems;
    });
  }


  return (
    <>
      <Title>FOOTBALL TOURNAMENT TRACKER</Title>
      {component === 'names' ? <Names onNext={handleOnNext} addName={handleAddName} removeName={handleRemoveName} names={names} /> : <Game names={names} />} 
    </>
  );
}

export default App;