import { useTheme } from '@emotion/react';
import InfoSection from 'src/components/info/InfoSection';
import QuoteSection from 'src/components/quote';
import RephraseTool from 'src/components/rephrase';
import Section from 'src/components/section';
const RephrasePage = () => {
  const theme = useTheme();

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
