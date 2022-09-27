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

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>
      <button
        onClick={() =>
          socketEmit({
            eventName: 'selectText',
            payload: {
              inputText: 'Test Text',
            },
          })
        }
      >
        emit test{' '}
      </button>
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
