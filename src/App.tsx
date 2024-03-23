import { useState } from 'react';
import { styled } from 'styled-components';

import './App.css';
import Names from './components/Names';
import Game from './components/Game';


const Title = styled.h1`
  color: white;
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
    if (names.length) {
      setComponent('games')
    }
  }

  return (
    <>
    <Title>FIFA Tournament Tracker</Title>
    {component === 'names' ? <Names onNext={handleOnNext} addName={handleAddName} names={names} /> : <Game names={names} />} 
    </>
  );

}

export default App
