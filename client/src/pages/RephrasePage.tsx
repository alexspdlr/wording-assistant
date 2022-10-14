import { useTheme } from '@emotion/react';
import LoadingRipple from 'src/components/general/loading-ripple';
import InfoSection from 'src/components/info/InfoSection';
import QuoteSection from 'src/components/quote';
import RephraseTool from 'src/components/rephrase';
import Section from 'src/components/section';
import useBoundStore from 'src/store';
const RephrasePage = () => {
  const theme = useTheme();

  const expectedResponse = useBoundStore(
    (state) => state.uiState.expectedResponse
  );

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>
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
