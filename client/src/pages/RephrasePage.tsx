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
const RephrasePage = () => {
  const theme = useTheme();

  const uiState = useBoundStore((state) => state.uiState);
  const serverState = useBoundStore((state) => state.serverState);

  const handleServerResponse = useBoundStore(
    (state) => state.handleServerResponse
  );
  const activeBreakpoint = useBreakpoint();

  return (
    <>
      <Section backgroundColor={theme.palette.background.dark}>
        <RephraseTool />
      </Section>
      <button
        onClick={() =>
          handleServerResponse(
            {
              workerState: {
                stateName: 'waitingForTargetTextAction',
                data: {
                  id: 'some_worker_id',
                  originalText: 'Bombshell text',
                  targetText: 'Bombshell text',
                  cursorIndex: 0,
                  rephrasingOptions: [],
                },
              },
              eventId: 'TEST',
            },
            'selectTextCompleted'
          )
        }
      >
        {' '}
        sendSelect text completed{' '}
      </button>
      <div style={{ display: 'flex' }}>
        BREAKPOINT: {activeBreakpoint}
        <div style={{ width: '50%', backgroundColor: 'yellow' }}>
          UI STATE:
          <div>{JSON.stringify(uiState)}</div>
        </div>
        <div style={{ width: '50%' }}>
          SERVER STATE:
          <div>{JSON.stringify(serverState)}</div>
        </div>
      </div>

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
