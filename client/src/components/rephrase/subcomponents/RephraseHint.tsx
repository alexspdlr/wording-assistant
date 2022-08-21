import styled from '@emotion/styled';
import { Breakpoint } from 'src/types/breakpoint';
import calculateRephraseHintHeadingSize from 'src/utils/calculateRephraseHintHeadingSize';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';

const Container = styled('div')(
  () => `
    position: absolute; 
    z-index: 0;  
    display: flex; 
    flex-grow: 1;
    justify-content: center;
    align-items: strech;
    flex-direction: column;
    text-align: left;
    margin: 16px 56px 72px 28px;
    `
);

interface HintHeadingProps {
  fontSize: number;
  lineHeight: number;
}

const HintHeading = styled('p')(
  (props: HintHeadingProps) => `
      font-weight: 300;
      color: rgb(110, 110, 110); 
      margin: 0px; 
      line-height: ${props.lineHeight}px;
      font-size: ${props.fontSize}px;
      `
);

const HintBody = styled('p')(
  () => `
      font-size: 16px;
      font-weight: 300;
      color: rgb(110, 110, 110); 
      line-height: 20px;
      margin: 0px; 
      padding-top: 7px;
      `
);

interface RephraseHintProps {
  hideHint: boolean;
  title: string;
  subtitle: string;
}

const RephraseHint = (props: RephraseHintProps) => {
  const { hideHint, title, subtitle } = props;
  const activeBreakpoint = useBreakpoint();
  const HintHeadingTextSize =
    calculateRephraseHintHeadingSize(activeBreakpoint);

  return (
    <Container>
      <HintHeading
        fontSize={HintHeadingTextSize.fontSize}
        lineHeight={HintHeadingTextSize.lineHeight}
      >
        {!hideHint && title}
      </HintHeading>
      <HintBody>
        {!hideHint &&
          compareBreakpoint(activeBreakpoint, '>', '2XS') &&
          subtitle}
      </HintBody>
    </Container>
  );
};

export default RephraseHint;
