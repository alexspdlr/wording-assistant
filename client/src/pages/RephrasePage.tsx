import Section from 'src/components/section';
import InfoSection from 'src/components/info';
import RephraseTool from 'src/components/rephrase';

const RephrasePage = () => {
  return (
    <>
      <Section backgroundColor='#f7f7f7' isFirstSection>
        <RephraseTool />
      </Section>

      <Section backgroundColor='#ffffff'>
        <InfoSection />
      </Section>
    </>
  );
};

export default RephrasePage;
