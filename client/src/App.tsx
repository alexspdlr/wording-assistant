import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [input, setInput] = useState('Teste diesen Satz');
  const [output, setOutput] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = async () => {
    setWaiting(true);
    const response = await fetch(`/result`, {
      method: 'POST',
      body: JSON.stringify({
        input: input,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());

    setOutput(response.result);
    setWaiting(false);
  };

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  return (
    <div className='App'>
      {!waiting ? (
        <header className='App-header'>
          <textarea
            id='w3review'
            name='w3review'
            rows={4}
            cols={50}
            onChange={handleInputChange}
          >
            Teste diesen Satz.
          </textarea>
          <button type='button' onClick={handleSubmit}>
            Send
          </button>

          <div>result :</div>
          {output}
        </header>
      ) : (
        <header className='App-header'>Wait ...</header>
      )}
    </div>
  );
}

export default App;
