import React, { useState, useEffect, useRef } from 'react';
import ClickableWord from './components/ClickableWord';
import './App.css';
import { workerData } from 'worker_threads';

/*

this is some string

1. words = output?.split(' ')
2. row_i = append word until row_i.length > 50 -> new row
3. 



*/

const outputToRows = (output: string, maxCharactersPerRow: number) => {
  const text = output?.replace('\r\n', '');
  const words = text?.split(' ');

  const rows: string[] = [];
  let rowTemp = '';

  words.forEach((word) => {
    if (rowTemp.length <= maxCharactersPerRow) {
      rowTemp =
        rowTemp.length === 0 ? (rowTemp = word) : [rowTemp, word].join(' ');
    } else {
      rows.push(rowTemp);
      rowTemp = word;
    }
  });

  rows.push(rowTemp);

  return rows;
};

interface WordIdentifier {
  row: number;
  word: number;
}

function App() {
  const [input, setInput] = useState(
    'Wie endlos lang erschien einem früher als Kind ein Jahr! Der nächste Geburtstag, die nächsten Sommerferien, das nächste Weihnachten lagen in ferner Zukunft.'
  );
  const [rows, setRows] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<WordIdentifier | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordIdentifier | null>(null);
  const maxCharactersPerRow = 50;

  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectedWord(null);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const handleSelectWord = (event: any, row: number, word: number) => {
    setSelectedWord({
      row,
      word,
    });
    console.log(`selected value - row: ${row} , word ${word}`);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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

    setRows(outputToRows(response.result, maxCharactersPerRow));

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
            defaultValue={input}
          />
          <button type='button' onClick={handleSubmit}>
            Send
          </button>

          <div>result :</div>
          <p
            style={{
              textAlign: 'left',
              position: 'absolute',
              top: '60%',
              left: '30%',
            }}
          >
            {rows.map((row, i) => (
              <div>
                {row?.split(' ').map((word, j) => (
                  <ClickableWord
                    ref={wrapperRef}
                    id={`clickable-word_row${i}_word-${j}`}
                    key={`clickable-word_row${i}_word-${j}`}
                    onMouseEnter={(e) =>
                      setHoveredWord({
                        row: i,
                        word: j,
                      })
                    }
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={(e) => handleSelectWord(e, i, j)}
                    selected={
                      selectedWord?.row === i && selectedWord?.word === j
                    }
                    willBeReplaced={
                      (!!hoveredWord && hoveredWord?.row < i) ||
                      (hoveredWord?.row === i && hoveredWord?.word < j) ||
                      (!!selectedWord && selectedWord?.row < i) ||
                      (selectedWord?.row === i && selectedWord?.word < j)
                    }
                  >
                    {word}
                  </ClickableWord>
                ))}
              </div>
            ))}
          </p>
        </header>
      ) : (
        <header className='App-header'>Wait ...</header>
      )}
    </div>
  );
}

export default App;
