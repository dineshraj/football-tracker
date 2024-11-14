import { MouseEventHandler, useState } from 'react';
import { styled } from 'styled-components';
import { Error } from '../styles';

const NamesWrapper = styled.div`
  display: flex;
  place-content: center;
  min-height: 70vh;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const NextButton = styled.button`
  margin-top: 30px;
  width: 100%;
  max-width: 500px;aaa
`;

const Name = styled.p`
  background-color: white;
  color: black;
  display: inline-block;
  padding: 14px;
  margin: 10px 10px auto;
  border-radius: 35px;
  width: 410px;
`;

const NameInput = styled.input`
background: transparent;
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 35px;
padding: 14px;
text-indent: 10px;
font-size: 21px;
outline: none;
color: rgba(255, 255, 255, 0.8);
letter-spacing: 2px;
max-width: 380px;
`;

const RemoveButton = styled.button`
  display: inline-block; 
  padding: 0px 10px;
  height: 60px;
  width: 60px;
  background-color: grey;
  padding-bottom: 2px;

`;

function Names({ onNext, addName, removeName, names }: { onNext: MouseEventHandler<HTMLButtonElement>, addName: Function, removeName: Function, names: string[]}) {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();


    // ADD A CHECK FOR DUPLICATE NAMES


    if (formData === '') {
      setError('Enter a name');
    } else {
      setError('');
      addName(event, formData)
      setFormData('');
    }
  };

  const handleOnNext = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!names.length) {
      setError('No names have been entered');
    } else if (names.length < 2) {
      setError('Enter more than one player');
    } else {
      onNext(event);
    }
  }

  return (
    <NamesWrapper>
      {error !== '' && <Error>{error}</Error>}
      <form onSubmit={handleSubmit}>      
        <NameInput name="name" type="text" onChange={({ target }) => setFormData(target.value)} value={formData} placeholder="Type a player/team name" />
        <button onClick={handleSubmit}>+</button>
      </form>
      {names.length ?  <h2>Players:</h2> : ''}
      {names.map((name: string, i: number) => {
          return (
            <div key={`row0${i}`}>
              <Name key={i}>{name}</Name>
              <RemoveButton key={`remove${i}`} onClick={() => removeName(i)}>-</RemoveButton>
            </div>
          )})
        }
      <NextButton onClick={handleOnNext}>Next</NextButton>
    </NamesWrapper>
  );
}

export default Names;