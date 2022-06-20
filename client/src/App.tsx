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
  targetRowIndex: number,
  targetWordIndex: number,
  rows: string[]
) => {
  let targetIndex = 0;

  rows.forEach((row, i) => {
    const wordsInRow = row?.split(' ');

    if (i < targetRowIndex) {
      targetIndex += wordsInRow.length;
    }
    if (i === targetRowIndex) {
      targetIndex += targetWordIndex;
    }
  });

  return targetIndex;
};

interface WordIdentifier {
  rowIndex: number;
  wordIndex: number;
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
  const [loading, setLoading] = useState<boolean>(false);
  const maxCharactersPerRow = 60;

  const handleDeselectWord = async (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleSelectWord = async (
    event: any,
    rowIndex: number,
    wordIndex: number
  ) => {
    setLoading(true);
    setPopoverOpen(true);
    setSelectedWord({
      HTMLelement: event.target,
      rowIndex,
      wordIndex,
    });

    const targetIndex = detectWordIndex(rowIndex, wordIndex, rows);

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
    setLoading(false);
  };

  const rephrase = async (alternative: string) => {
    setLoading(true);
    console.log('target value: ', alternative);

    if (!selectedWord) {
      alert('Error: No word is selected.');
    }

    const loadingRows = rows
      .filter((row, i) => i <= selectedWord!.rowIndex)
      .map((row, i) => {
        console.log('row: ', i, row);
        if (i < selectedWord!.rowIndex) {
          return row;
        }

        const loadingRow = row
          .split(' ')
          .slice(0, selectedWord!.wordIndex)
          .join(' ')
          .concat(` ${alternative.replace('...', '')}`);

        return loadingRow;
      });

    console.log('loadingRows: ', loadingRows);

    setRows(loadingRows);
    setPopoverOpen(false);
    setSelectedWord(null);
    setAlternatives([]);

    const response = await fetch(`/select-rephrasing-option`, {
      method: 'POST',
      body: JSON.stringify({
        selectedOption: alternative,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());

    setRows(outputToRows(response.rephrasingResult, maxCharactersPerRow));
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
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
    setLoading(false);
    setWaiting(false);
  };

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  return (
    <div className='App'>
      {navigator.language}

      <header className='App-header'>
        <TextArea
          id='w3review'
          name='w3review'
          rows={4}
          cols={50}
          onChange={handleInputChange}
          defaultValue={input}
          disabled={waiting}
        />

        {waiting ? (
          <h6>Rephrasing ...</h6>
        ) : (
          <Button type='button' onClick={handleSubmit}>
            Rephrase
          </Button>
        )}

        <p
          style={{
            textAlign: 'left',
            position: 'absolute',
            top: '60%',
            left: '30%',
          }}
        >
          {!waiting &&
            rows.map((row, i) => (
              <div
                style={{
                  fontSize: 0,
                }}
              >
                {row?.split(' ').map((word, j) => (
                  <ClickableWord
                    loading={loading}
                    id={`clickable-word_row${i}_word-${j}`}
                    key={`clickable-word_row${i}_word-${j}`}
                    onMouseEnter={(e) =>
                      !loading &&
                      setHoveredWord({
                        rowIndex: i,
                        wordIndex: j,
                        HTMLelement: e.currentTarget,
                      })
                    }
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={(e) => !loading && handleSelectWord(e, i, j)}
                    selected={
                      selectedWord?.rowIndex === i &&
                      selectedWord?.wordIndex === j
                    }
                    willBeReplaced={
                      (!!hoveredWord && hoveredWord?.rowIndex < i) ||
                      (hoveredWord?.rowIndex === i &&
                        hoveredWord?.wordIndex < j) ||
                      (!!selectedWord && selectedWord?.rowIndex < i) ||
                      (selectedWord?.rowIndex === i &&
                        selectedWord?.wordIndex < j)
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
          rephrase={rephrase}
        />
      </header>
    </div>
  );
}

export default App;
