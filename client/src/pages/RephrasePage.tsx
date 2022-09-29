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
                inputText: 'Test Text',
              },
            })
          }
        >
          select Text ("Test Text")
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
              endpoint: 'selectWord',
              payload: {
                inputText: 'Test Text',
              },
            })
          }
        >
          select First Word
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'selectWord',
              payload: {
                inputText: 'Test Text',
              },
            })
          }
        >
          deselect word
        </button>

        <button
          onClick={() =>
            socketEmit({
              endpoint: 'selectWord',
              payload: {
                inputText: 'Test Text',
              },
            })
          }
        >
          select wording alternative
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
