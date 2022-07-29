import Section from 'src/components/section';
import RephraseTool from 'src/components/rephrase';
import QuoteSection from 'src/components/quote';
import InfoSection from 'src/components/info/InfoSection';

const RephrasePage = () => {
  return (
    <>
      <Section backgroundColor='#f7f7f7'>
        <RephraseTool />
      </Section>

      <Section backgroundColor='#ffffff'>
        <InfoSection />
      </Section>

      <Section backgroundColor='#f7f7f7'>
        <QuoteSection />
      </Section>
    </>
  );
};

export default RephrasePage;
