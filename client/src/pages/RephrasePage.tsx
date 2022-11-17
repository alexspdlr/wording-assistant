import { useTheme } from '@emotion/react';
import Section from 'src/components/appbody-section';
import InfoSection from 'src/components/product-info/ProductInfo';
import QuoteSection from 'src/components/quote';
import RephraseTool from 'src/components/rephrase';
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
