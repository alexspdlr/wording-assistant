import React, { useState, useEffect, useRef } from 'react';
import ClickableWord from './components/ClickableWord';
import './App.css';
import { workerData } from 'worker_threads';
import TextArea from './components/TextArea';
import Button from './components/Button';
import Popover from './components/Popover';
import { CloseReason, Fade } from '@mui/material';

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

const detectWordIndex = (
  targetRow: number,
  targetWord: number,
  rows: string[]
) => {
  let targetIndex = 0;

  rows.forEach((row, i) => {
    const wordsInRow = row?.split(' ');

    if (i < targetRow) {
      targetIndex += wordsInRow.length;
    }
    if (i === targetRow) {
      targetIndex += targetWord;
    }
  });

  return targetIndex;
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
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const maxCharactersPerRow = 60;

  const handleDeselectWord = async (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    setPopoverOpen(false);
    setSelectedWord(null);
    setAlternatives([]);
    await fetch(`/close-rephrasing-options`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'close',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  const handleSelectWord = async (event: any, row: number, word: number) => {
    setPopoverOpen(true);
    setSelectedWord({
      HTMLelement: event.target,
      row,
      word,
    });

    const targetIndex = detectWordIndex(row, word, rows);

    const response = await fetch(`/show-rephrasing-options`, {
      method: 'POST',
      body: JSON.stringify({
        targetWordIndex: targetIndex,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());
    setAlternatives(response.rephrasingAlternatives);
  };

  const handleSubmit = async () => {
    setWaiting(true);
    const response = await fetch(`/generate-rephrasing-base`, {
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

          <Popover
            open={popoverOpen}
            anchorEl={selectedWord?.HTMLelement}
            alternatives={alternatives}
            onClose={handleDeselectWord}
          />
        </header>
      ) : (
        <header className='App-header'>Wait ...</header>
      )}
    </div>
  );
}

export default App;
