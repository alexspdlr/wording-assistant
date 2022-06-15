import React, { useState, useEffect, useRef } from 'react';
import ClickableWord from './components/ClickableWord';
import './App.css';
import { workerData } from 'worker_threads';
import TextArea from './components/TextArea';
import Button from './components/Button';
import Popover from './components/Popover';
import { Fade } from '@mui/material';

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
  HTMLelement: HTMLElement;
}

function App() {
  const [input, setInput] = useState(
    'Wie endlos lang erschien einem früher als Kind ein Jahr! Der nächste Geburtstag, die nächsten Sommerferien, das nächste Weihnachten lagen in ferner Zukunft.'
  );
  const [rows, setRows] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<WordIdentifier | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordIdentifier | null>(null);
  const maxCharactersPerRow = 60;

  const useOutsideAlerter = (ref: React.MutableRefObject<any>) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setPopoverOpen(false);
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
    setPopoverOpen(true);
    setSelectedWord({
      HTMLelement: event.target,
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
          <TextArea
            id='w3review'
            name='w3review'
            rows={4}
            cols={50}
            onChange={handleInputChange}
            defaultValue={input}
          />

          <Button type='button' onClick={handleSubmit}>
            Rephrase
          </Button>

          <p
            style={{
              textAlign: 'left',
              position: 'absolute',
              top: '60%',
              left: '30%',
            }}
          >
            {rows.map((row, i) => (
              <div
                style={{
                  fontSize: 0,
                }}
              >
                {row?.split(' ').map((word, j) => (
                  <ClickableWord
                    ref={wrapperRef}
                    id={`clickable-word_row${i}_word-${j}`}
                    key={`clickable-word_row${i}_word-${j}`}
                    onMouseEnter={(e) =>
                      setHoveredWord({
                        row: i,
                        word: j,
                        HTMLelement: e.currentTarget,
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

          <Popover open={popoverOpen} anchorEl={selectedWord?.HTMLelement}>
            The content of the Popover.
          </Popover>
        </header>
      ) : (
        <header className='App-header'>Wait ...</header>
      )}
    </div>
  );
}

export default App;
