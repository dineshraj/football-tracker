import { MouseEventHandler, useState } from 'react';
import { styled } from 'styled-components';
import { Error } from '../styles';

const NextButton = styled.button`
  margin-top: 30px;
  width: 175px;
`;

const Name = styled.p`
  background-color: white;
  color: black;
  border-color: 1px solid black;
  width: 130px;
  display: inline-block;
  padding: 10px;
  margin: 10px;
  border-radius: 35px
`;

const RemoveButton = styled.button`
  padding: 0 10px;
  background-color: grey;
  padding-bottom: 2px;

`;

function Names({ onNext, addName, removeName, names }: { onNext: MouseEventHandler<HTMLButtonElement>, addName: Function, removeName: Function, names: string[]}) {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
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
    <>
      {error !== '' && <Error>{error}</Error>}
      <form onSubmit={handleSubmit}>      
        <input name="name" type="text" onChange={({ target }) => setFormData(target.value)} value={formData} placeholder="Type name and hit enter" />
        {names.length ?  <h2>Players:</h2> : ''}
      </form>
      {names.map((name: string, i: number) => {
          return (
            <div key={`row0${i}`}>
              <Name key={i}>{name}</Name>
              <RemoveButton key={`remove${i}`} onClick={() => removeName(i)}>-</RemoveButton>
            </div>
          )})
        }
      <NextButton onClick={handleOnNext}>Next</NextButton>
    </>
  );
}

export default Names;