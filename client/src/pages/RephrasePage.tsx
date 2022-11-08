import Section from 'src/components/section';
import RephraseTool from 'src/components/rephrase';
import QuoteSection from 'src/components/quote';
import InfoSection from 'src/components/info/InfoSection';
import { useTheme } from '@emotion/react';
import useBoundStore from 'src/store';
import { useEffect } from 'react';
import CustomPopover from 'src/components/Popover';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useMouseIsDown from 'src/utils/hooks/useMouseIsDown';
import useIsTyping from 'src/utils/hooks/useIsTyping';
const RephrasePage = () => {
  const theme = useTheme();

  const uiState = useBoundStore((state) => state.uiState);
  const serverState = useBoundStore((state) => state.serverState);

  const activeBreakpoint = useBreakpoint();

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
