import { MouseEventHandler, useState } from 'react';


function Names({ onNext, addName, names }: { onNext: MouseEventHandler<HTMLButtonElement>, addName: Function, names: string[]}) {
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
  
  return (
    <>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" onChange={({ target }) => setFormData(target.value)} value={formData} />
        <button onClick={handleSubmit}>+</button>
        {names.map((name: string, i: number) => <p key={i}>{name}</p>)}
      </form>
      <button onClick={onNext}>Next</button>
    </>
  );
}

export default Names;