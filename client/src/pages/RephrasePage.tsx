import Section from 'src/components/section';
import RephraseTool from 'src/components/rephrase';
import QuoteSection from 'src/components/quote';
import InfoSection from 'src/components/info/InfoSection';
import { useTheme } from '@emotion/react';
import useBoundStore from 'src/store';
import { useEffect } from 'react';
import CustomPopover from 'src/components/Popover';
const RephrasePage = () => {
  const theme = useTheme();

  const activeWorkerState = useBoundStore((state) => state.activeWorkerState);

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>
      STATE:
      <div>{JSON.stringify(activeWorkerState)}</div>
      <CustomPopover
        alternatives={['Test ...', 'Bla ...']}
        rephrase={(alternative: string) => console.log(alternative)}
      >
        <div>test</div>
      </CustomPopover>
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
