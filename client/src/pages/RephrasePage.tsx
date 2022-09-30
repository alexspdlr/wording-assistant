import Section from 'src/components/section';
import RephraseTool from 'src/components/rephrase';
import QuoteSection from 'src/components/quote';
import InfoSection from 'src/components/info/InfoSection';
import { useTheme } from '@emotion/react';
import useBoundStore from 'src/store';
import { useEffect } from 'react';
const RephrasePage = () => {
  const theme = useTheme();

  const socketEmit = useBoundStore((state) => state.socketEmit);
  const activeWorkerState = useBoundStore((state) => state.activeWorkerState);

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>
      STATE:
      <div>{JSON.stringify(activeWorkerState)}</div>
      ACTIONS:
      <div>
        <button
          onClick={() =>
            socketEmit({
              endpoint: 'selectText',
              payload: {
                inputText: 'A cool input text is being tested',
              },
            })
          }
        >
          select Text ("A cool input text is being tested")
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'deselectText',
              payload: {},
            })
          }
        >
          deselect Text
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'moveCursor',
              payload: {
                newCursorIndex: 7,
              },
            })
          }
        >
          move cursor to i = 7
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'moveCursor',
              payload: {
                newCursorIndex: 0,
              },
            })
          }
        >
          move cursor to i = 0
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'moveCursor',
              payload: {
                newCursorIndex: 2,
              },
            })
          }
        >
          move cursor to i = 2
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'moveCursor',
              payload: {
                newTargetText: 'Test this super-duper complicated input text',
                postChangeCursorIndex: 5,
              },
            })
          }
        >
          update target text to "super-duper"
        </button>
      </div>
      <Section backgroundColor={theme.palette.background.main}>
        <InfoSection />
      </Section>
      <Section backgroundColor={theme.palette.background.dark}>
        <QuoteSection />
      </Section>
    </>
  );
};

export default RephrasePage;
